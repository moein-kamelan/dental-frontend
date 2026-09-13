import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [fontsCss, globalCss, indexHtml] = await Promise.all([
  readFile(new URL("../src/styles/fonts.css", import.meta.url), "utf8"),
  readFile(new URL("../src/styles/global.css", import.meta.url), "utf8"),
  readFile(new URL("../index.html", import.meta.url), "utf8"),
]);

test("Vazirmatn is the locally hosted font for the complete interface", () => {
  assert.match(fontsCss, /font-family:\s*"Vazirmatn"/);
  assert.match(fontsCss, /Vazirmatn-Variable\.woff2/);
  assert.match(fontsCss, /font-weight:\s*100 900/);
  assert.match(globalCss, /--font-vazir:\s*"Vazirmatn"/);
  assert.match(indexHtml, /href="\/fonts\/Vazirmatn-Variable\.woff2"/);
  assert.doesNotMatch(indexHtml, /preload[^>]+Estedad/);
});
