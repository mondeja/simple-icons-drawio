#!/usr/bin/env node
/**
 * @fileoverview
 * Creates partial drawio libraries of all Simple Icons separated by alphabet letter.
 */

import * as icons from "simple-icons";

import { build } from "./build.js";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ICONS = Object.values(icons);

const determineLetter = (letter) => {
    if (letter >= '0' && letter <= '9') {
        return '0-9';
    }
    return letter;
}

const determineFirstLetters = () => {
  const letters = new Set();
  for (const icon of ICONS) {
    const firstLetter = determineLetter(icon.slug[0]);
    if (!letters.has(firstLetter)) {
      letters.add(firstLetter);
    }
  }

   return Array.from(letters).sort();
}

const buildPartialLibraries = (letters) => {
  process.stdout.write('Building partial libraries for letters')
  for (const letter of letters) {
    const alphabetFilter = letter === '0-9' ? '0,1,2,3,4,5,6,7,8,9' : letter;
    const partialLib = build(undefined, alphabetFilter);
    fs.writeFileSync(
      path.join(
        "./dist",
        `${letter}.xml`
      ),
      partialLib
    );
    process.stdout.write(` ${letter}`);
    if (letter !== letters[letters.length - 1]) {
      process.stdout.write(', ');
    } else {
      // Last letter
      process.stdout.write('\n');
    }
  }
}

const getPackageJsonVersion = () => {
  const packageJsonPath = path.join('.', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.version;
}

const updateReadme = (letters) => {
  const readmePath = path.join('.', 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const version = getPackageJsonVersion();

  const startMarker = '<!-- partial builds table -->';
  const endMarker = '<!-- partial builds table end -->';

  const tableLines = [];
  tableLines.push('| Build | Download Link |');
  tableLines.push('|--------|---------------|');
  for (const letter of letters) {
    const downloadLink = `https://github.com/mondeja/simple-icons-drawio/releases/download/${version}/${letter}.xml`;
    tableLines.push(`| \`${letter}\` | [${letter}.xml](${downloadLink}) |`);
  }

  const newTableContent = `${startMarker}\n${tableLines.join('\n')}\n${endMarker}`;
  const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'gm');
  readmeContent = readmeContent.replace(regex, newTableContent);
  fs.writeFileSync(readmePath, readmeContent);
}

const buildPartials = () => {
  const letters = determineFirstLetters();
  buildPartialLibraries(letters);
  updateReadme(letters);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true, force: true });
  }
  fs.mkdirSync('./dist');
  buildPartials();
}
