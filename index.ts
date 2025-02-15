import fs from "fs/promises";
import bunPluginTailwind from "bun-plugin-tailwind";
import { Webview } from "webview-bun";

const webview = new Webview();

const outputs = (
  await Bun.build({
    entrypoints: ["index.html"],
    plugins: [bunPluginTailwind],
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

const css = (
  await Bun.$`bunx tailwindcss -c ./tailwind.config.js -i ./src/style.css`
).stdout.toString();

texts.set("css", css);

const html = texts.get("html")?.replace(
  /<link.*<\/head>/,
  `<style>${texts.get("css")}</style>
  <script type="module">${texts.get("js")}</script>
  </head>`
) as string;

fs.writeFile("test.html", html);

webview.setHTML(html);
webview.run();
