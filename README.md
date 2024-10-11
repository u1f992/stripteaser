# Stripteaser

Executes JavaScript and strips out all script tags in HTML.

```
$ npm install --global @u1f992/stripteaser
$ stripteaser test.html
```

## Why and when do we need this?

This CLI tool is designed for preprocessing HTML documents containing JavaScript, specifically for use in CSS typesetting. Although several CSS typesetting engines claim to support JavaScript, the support is often less comprehensive and practical compared to its primary use in web development.

The simplest and most effective solution, compatible with all CSS typesetting engines, is to use a headless browser to prerender any DOM changes made by JavaScript, and then remove scripts. This is one of the acceptable approaches since even "dynamic" documents that include JavaScript are, at some point, represented as a static DOM tree in the context of CSS typesetting. This tool leverages [Playwright](https://playwright.dev/) to perform this task using Chromium, following the [Vivliostyle](https://vivliostyle.org/) toolchain.

<details>
<summary>Further discussion</summary>

Issues include improper emulation of `DOMContentLoaded` or `defer`, styling problems for elements added via scripts, and query selector breakdowns due to document structure changes during typesetting. To clarify, this reflects the inherent challenges in CSS typesetting rather than any shortcomings in existing engines.

If we were to adopt a custom layout engine, we would need to implement complex algorithms to handle reflows and repaints triggered by JavaScript, similar to how browsers function. Considering the immense resources invested in browsers like Chromium, it becomes clear that supporting JavaScript would require an impractical amount of effort.

Furthermore, even when using an existing browser for rendering, the problem is not simple. In this case, it's likely that the typesetting engine would need to manage both an "intrinsic object model" and a "display object model." In typical web development, we assume that the intrinsic model is loaded into the browser's context. However, when it comes to a CSS typesetting engine using a browser for rendering, what actually exists is the display model, and it's clear that simply running scripts in the browser won't work effectively.

</details>

## Related resources

- [print-css.rocks - PrintCSS CSS Paged Media tutorial and information](https://print-css.rocks/lessons)
- [CSS Formatterの処理事例で考える、HTML文書からのJavaScript除去 ~前編~](https://youtu.be/YXJy4XIE8yg?si=0J6LbQAquJ8KU1Hx)/[~後編~](https://youtu.be/OEBQo1J83zA?si=VvzqQnDmlEeBdauu)
  - [HTML＋LaTeX から HTML＋SVG への変換 - Antenna House Formatter](https://www.antenna.co.jp/AHF/ahf_samples/LaTeXToSVG.html)