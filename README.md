# FitX Design Tokens

![npm (scoped)](https://img.shields.io/npm/v/@fitx/design-tokens?style=flat-square&color=blue)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@fitx/design-tokens)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@fitx/design-tokens)

**FitX Design Tokens** is a design token bundling project that provides bundled CSS, JS, and JSON files to deliver 
consistent design token data in various formats. 
It uses [Style Dictionary](https://amzn.github.io/style-dictionary/) to process and convert design tokens created 
according to the W3C Design Token Community Group (DTCG) standard.

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Design Tokens](#design-tokens)
- [Build Process](#build-process)

Füge diesen Abschnitt einfach an der gewünschten Stelle in deine README ein.

## Usage
**Use Tokens in Code:**
```bash
npm install @fitx/design-tokens
```

```css
@import '@fitx/design-tokens/styles/color.css' layer(fitx-tokens);
```

```js
import '@fitx/design-tokens/tokens.js';
```

**Use Tokens ins Figma:**
Install Figma Plugin like [Variables Import](https://www.figma.com/community/plugin/1253424530216967528/variables-import) 
by [microsoft](https://github.com/microsoft/figma-variables-import) and import tokens.json.

## Project Overview
This project reads design tokens from the `tokens/` directory, which follow the dtcg standard, 
and generates bundled files in the `build/` directory in various formats (CSS, JS, JSON). 
It uses Style Dictionary to define and transform the design tokens into the desired output formats.

## Directory Structure
```
├── build/                 # Generated output files after build
├──── styles/              # Contains splitted and merged CSS Files
├────── tokens.css         # Merged Tokens
├────── [token-group].css  # splitted CSS Files e.g color.css
├── tokens/                # Source design token files (dtcg standard)
├── sd.config.js           # Style Dictionary configuration file
```

## Installation
Before build, install the dependencies via npm:

```bash
npm install
```

## Design Tokens
The design tokens are located in the `tokens/` directory and follow the [W3C Design Token Community Group (DTCG)](https://tr.designtokens.org/format/) standard. 
These token files are read by the build process and transformed into CSS, JS, and JSON output formats.

## Build Process
The build process is executed using [Style Dictionary](https://amzn.github.io/style-dictionary/). 
To generate the bundled design tokens, use the following command:

```bash
npm run build-tokens
```

The bundled files will be stored in the `build/` directory.
