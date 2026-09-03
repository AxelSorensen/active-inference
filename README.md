# 🎚️ Variational Free Energy Visualizer

An interactive p5.js sketch that plots two Gaussian distributions and their variational free energy as you drag sliders.

## Features

- 🎛️ **Live sliders** — adjust the mean and standard deviation of an approximate posterior `Q(x)` and a likelihood `P(y|x)`
- 📈 **Real-time plotting** — redraws both distributions on every slider change using p5.js
- 🧮 **Free energy calculation** — integrates energy and entropy terms to show variational free energy as the curves change

## Installation

No build step — clone and open the HTML file:

```bash
git clone <this repo>
cd active-inference
```

## Usage

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

`eq_2.html` and `formulas.png` provide the underlying equations for reference.

## Built with

- [p5.js](https://p5js.org/) (loaded via CDN)
- Vanilla JavaScript, HTML

## Status

🚧 Small teaching/demo sketch — single-file, no tests, no dependency management. Works as-is but isn't set up as a project with a build pipeline.
