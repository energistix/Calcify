import { Webview } from "webview-bun";
import html from "./dist/bundle.html" with { type: "text" };

const webview = new Webview();

webview.setHTML(html);
webview.run();
