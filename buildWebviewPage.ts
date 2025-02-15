import path from "path";
import fs from "fs";

await Bun.$`bun run build`;

// Lire le fichier HTML
let html = await Bun.file("./dist/index.html").text();

console.log("Remplacement des scripts...");
html = html.replace(
  /<script type="module" crossorigin src="(.+?)"><\/script>/g,
  (_, src) => {
    const modulePath = path.join("dist", src);
    const moduleContent = fs.readFileSync(modulePath, "utf-8");
    return `<script defer type="module">${moduleContent}</script>`;
  }
);

console.log("Remplacement des styles...");
html = html.replace(
  /<link rel="stylesheet" crossorigin href="(.+?)">/g,
  (_, href) => {
    const cssPath = path.join("dist", href);
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    return `<style>${cssContent}</style>`;
  }
);

// Écrire le fichier modifié
await Bun.file("./dist/bundle.html").write(html);

console.log("Minification terminée.");
