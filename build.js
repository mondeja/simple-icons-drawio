#!/usr/bin/env node
/**
 * @fileoverview
 * Creates a drawio library with all simple-icons icons.
 */

const fs = require("fs");
const simpleIcons = require("simple-icons");
const zlib = require("zlib");

const SVG_TITLE_EXPR = /<title>([^<]+)</

const extractIconTitle = (svg) => svg.match(SVG_TITLE_EXPR)[1]

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
  return encodeURIComponent(xml).replace('*', '%2A');
}

const buildLibrary = () => {
  const library = [];
  for (const slug in simpleIcons) {
    const icon = simpleIcons[slug];
    const styledSvg =
      `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">`
      + `<style>svg{fill:#${icon.hex};}</style>`
      + `<path d="${icon.path}"/>`
      + `</svg>`

    const buffer = zlib.deflateSync(encodeMxGraph(mxGraph(styledSvg)));
    library.push({
      xml: buffer.slice(2, buffer.length - 4).toString("base64"),
      h: 144,
      w: 144,
      title: extractIconTitle(icon.svg),
    });
  }
  return library;
}

fs.writeFileSync(
  "simple-icons.xml",
  `<mxlibrary title="Simple Icons">${JSON.stringify(buildLibrary())}</mxlibrary>`
);
