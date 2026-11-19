import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const html = readFileSync("dist/index.html", "utf8");
writeFileSync("dist/index.html", html.replace("<!--app-->", render()));
rmSync("dist-ssr", { recursive: true, force: true });
console.log("prerendered");
