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
  return `<mxGraphModel><root><mxCell id="0" /><mxCell id="1" parent="0" /><mxCell id="2" value="" style="shape=image;editableCssRules=.*;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=data:image/svg+xml,${new Buffer.from(svg).toString("base64")};fillColor=#000000;" vertex="1" parent="1"><mxGeometry width="144" height="144" as="geometry" /></mxCell></root></mxGraphModel>`;
}

const encodeMxGraph = (xml) => {
  return encodeURIComponent(xml).replace(/\*/, '%2A');
}

const simpleIconsArray = Object.keys(simpleIcons),
  library = [];

let index = 0;
const addIconToLibrary = (onSuccess) => {
  const icon = simpleIcons[simpleIconsArray[index]];
  const styledSvg = icon.svg
    .replace(
      `</title>`,
      `</title><style type="text/css">path{fill:#${icon.hex};}</style>`
    );
  zlib.deflate(encodeMxGraph(mxGraph(styledSvg)), (err, buffer) => {
    library.push({
      xml: buffer.slice(2, buffer.length - 4).toString("base64"),
      h: 144,
      w: 144,
      title: encodeHTML(simpleIcons[simpleIconsArray[index]].title),
      aspect: "fixed",
    });
    
    index++;
    
    onSuccess();
  });
}

const callback = () => {
  if (index < simpleIconsArray.length) {
    addIconToLibrary(callback);
  } else {
    const output = `<mxlibrary title="Simple Icons">${JSON.stringify(library)}</mxlibrary>`;
    fs.writeFileSync("simple-icons.xml", output);
  }
};
addIconToLibrary(callback);

