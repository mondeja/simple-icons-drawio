#!/usr/bin/env node
/**
 * @fileoverview
 * Creates a drawio library with all simple-icons icons.
 */

import zlib from "node:zlib";
import * as icons from "simple-icons/icons";

const ICONS = Object.values(icons);

const simplifyHexIfPossible = (hex) => {
  if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] == hex[5]) {
    return `${hex[0]}${hex[2]}${hex[4]}`;
  }
  return hex;
};

const encodedMxGraph = (path, hex) => {
  return encodeURIComponent(
    `<mxGraphModel>` +
      `<root>` +
      `<mxCell id="0" />` +
      `<mxCell id="1" parent="0" />` +
      `<mxCell` +
      ` id="2"` +
      ` style="` +
      `shape=image;` +
      `editableCssRules=.*;` +
      `image=data:image/svg+xml,${new Buffer.from(
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">` +
          `<style>*{fill:#${simplifyHexIfPossible(hex)}}</style>` +
          `<path d="${path}"/>` +
          `</svg>`
      ).toString("base64")};` +
      `"` +
      ` vertex="1"` +
      ` parent="1"` +
      `>` +
      `<mxGeometry width="144" height="144" as="geometry" />` +
      `</mxCell>` +
      `</root>` +
      `</mxGraphModel>`
  ).replace("*", "%2A");
};

const buildLibrary = function* (slugs = []) {
  for (const icon of ICONS) {
    if (slugs.length && !slugs.includes(icon.slug)) {
      continue;
    }
    const buffer = zlib.deflateSync(encodedMxGraph(icon.path, icon.hex));
    yield {
      xml: buffer.slice(2, buffer.length - 4).toString("base64"),
      h: 144,
      w: 144,
      title: icon.svg.split(">")[2].split("<")[0],
    };
  }
};

const determineSlugs = () => {
  const allSlugs = ICONS.map((icon) => icon.slug);
  let slugs = [];

  if (process.env.SI_DRAWIO_SLUGS_FILTER) {
    slugs = process.env.SI_DRAWIO_SLUGS_FILTER.split(",");

    const validSlugs = [];
    for (const slug of slugs) {
      if (!allSlugs.includes(slug)) {
        process.stderr.write(
          `[ERROR]: Invalid slug "${slug}" selected to build simple-icons-drawio library\n`
        );
      } else {
        validSlugs.push(slug);
      }
    }
    if (slugs.length !== validSlugs.length) {
      process.stderr.write("INTERRUPTED\n");
      process.exit(1);
    }
  }

  if (slugs.length === 0) {
    slugs = allSlugs;
  }

  if (process.env.SI_DRAWIO_ALPHABET_FILTER) {
    const regex = new RegExp(
      "^(" +
        process.env.SI_DRAWIO_ALPHABET_FILTER.split(",")
          .map((c) => c.toLowerCase())
          .join("|") +
        ")"
    );
    slugs = slugs.filter((slug) => slug.match(regex));
  }

  return slugs;
};

process.stdout.write(
  `<mxlibrary title="Simple Icons">` +
    JSON.stringify(Array.from(buildLibrary(determineSlugs()))) +
    `</mxlibrary>`
);
