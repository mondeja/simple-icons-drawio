#!/usr/bin/env node
/**
 * @fileoverview
 * Creates a drawio library with all simple-icons icons.
 */

const fs = require("fs");
const simpleIcons = require("simple-icons");
const zlib = require("zlib");

const encodeHTML = value => value
  .replace(/&/g, '&#38;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const mxGraph = (svg) => {
  return `<mxGraphModel>`
    + `<root>`
    + `<mxCell id="0" />`
    + `<mxCell id="1" parent="0" />`
    + `<mxCell`
    + ` id="2"`
    + ` style="`
      + `shape=image;`
      + `editableCssRules=.*;`
      + `image=data:image/svg+xml,${new Buffer.from(svg).toString("base64")};`
    + `"`
    + ` vertex="1"`
    + ` parent="1"`
    + `>`
    + `<mxGeometry width="144" height="144" as="geometry" />`
    + `</mxCell>`
    + `</root>`
    + `</mxGraphModel>`;
}

const encodeMxGraph = (xml) => {
  return encodeURIComponent(xml).replace(/\*/, '%2A');
}

const buildLibrary = (onFinished) => {
  const library = [];
  for (let iconSlug in simpleIcons) {
    const icon = simpleIcons[iconSlug];
    const styledSvg = icon.svg
      .replace(
        `</title>`,
        `</title><style type="text/css">path{fill:#${icon.hex};}</style>`
      );

    const buffer = zlib.deflateSync(encodeMxGraph(mxGraph(styledSvg)));
    library.push({
      xml: buffer.slice(2, buffer.length - 4).toString("base64"),
      h: 144,
      w: 144,
      title: encodeHTML(icon.title),
      aspect: "fixed",
    });
  }
  return library;
}

fs.writeFileSync(
  "simple-icons.xml",
  `<mxlibrary title="Simple Icons">${JSON.stringify(buildLibrary())}</mxlibrary>`
);
