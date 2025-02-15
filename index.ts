import fs from "fs/promises";

import { Webview } from "webview-bun";

const webview = new Webview();

const outputs = (
  await Bun.build({
    entrypoints: ["index.html"],
  })
).outputs;

const texts = new Map(
  await Promise.all(
    outputs.map(
      async (output) =>
        [output.path.split(".").pop(), await output.text()] as [string, string]
    )
  )
);

const html = texts.get("html")?.replace(
  /<link.*<\/head>/,
  `<style>${texts.get("css")}</style>
  <script type="module">${texts.get("js")}</script>
  </head>`
) as string;

fs.writeFile("test.html", html);

webview.setHTML(html);
webview.run();
