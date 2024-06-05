English | [简体中文](./readme.zh-CN.md)

A CSS generation module based on the [Dynamic Color Utilities](https://github.com/material-foundation/material-color-utilities/tree/main) from Material Design. It facilitates dynamic colors on the web by using real-time updated CSS and CSS variable references.

[**Live Demo**](https://linvie.github.io/material-color-css/)

## Getting Started

```cli
npm i material-color-css
```

Move the generated CSS to the root directory

**windows**

```
move "./node_modules/material-color-css/public" "."
```

**Unix/Linux/macOS**

```
mv "./node_modules/material-color-css/public" "."
```

Add the CSS to `/public/css/style.css` and link it in `index.html` or directly link `/public/css/material-colors.css` in your CSS file.

## Usage

The CSS variable names in `material-colors.css` are structured as follows:

```
--< light / dark>-< default / medium / high >-< color name >
// --mode-contrast-color name
```

If your webpage does not need to switch between light/dark modes and contrast levels, it is recommended to keep the first two parameters consistent and choose colors within the same category.

For detailed color selection, please refer to the [color roles](https://m3.material.io/styles/color/roles) section in Material Design.

Include the variables in your CSS file to use them:

```
//your css
@import url("material-colors.css");

body {
    background-color: var(--token-name);
    color: var(--token-name);
  }
```

Updating Colors

```
// your js
import { updateColors, updateColorFromImage } from "material-color-css";

updateColors(sourceColor, scheme);
// sourceColor should be a hex format color like "#431104"
// scheme is optional, default is "tonalspot", this parameter uses different color templates, and when provided, should be in string format without spaces

updateColorFromImage(file, scheme);
// file should be an image file

// e.g.
const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("clicked");
  updateColors("#ffffff");
});

document.querySelector("input[type='file']").addEventListener("change", (e) => {
  const file = e.target.files[0];
  updateColorFromImage(file);
});
```

Color Templates

There are nine different color templates available. The official descriptions are as follows, and you can check the effects through the [webpage](https://linvie.github.io/material-color-css/).

- Content

  A scheme that places the source color in `Scheme.primaryContainer`.

  - Primary Container is the source color, adjusted for color relativity.
  - It maintains constant appearance in light mode and dark mode.
  - This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
  - Tertiary Container is the complement to the source color, using
  - `TemperatureCache`. It also maintains constant appearance.

- Expressive

  A Dynamic Color theme that is intentionally detached from the source color.

- Fidelity

  A scheme that places the source color in `Scheme.primaryContainer`.

  - Primary Container is the source color, adjusted for color relativity.
  - It maintains constant appearance in light mode and dark mode.
  - This adds ~5 tone in light mode, and subtracts ~5 tone in dark mode.
  - Tertiary Container is the complement to the source color, using
  - `TemperatureCache`. It also maintains constant appearance.

- Fruit salad

  A playful theme - the source color's hue does not appear in the theme.

- Monochrome

  A Dynamic Color theme that is grayscale.

- Neutral

  A Dynamic Color theme that is near grayscale.

- Rainbow

  A playful theme - the source color's hue does not appear in the theme.

- Tonal spot

  A Dynamic Color theme with low to medium colorfulness and a Tertiary

  - TonalPalette with a hue related to the source color.
  - The default Material You theme on Android 12 and 13.

- Vibrant

  A Dynamic Color theme that maxes out colorfulness at each position in the Primary Tonal Palette.

## Note

The NPM package of Material Design [Dynamic Color Utilities](https://github.com/material-foundation/material-color-utilities/tree/main) has not been updated for a long time. There are undefined issues when using the Rainbow and FruitSalad templates. Refer to the [issue](https://github.com/material-foundation/material-color-utilities/issues/137) for more details.

**Solution:**

// Refer to the issue to modify the module references or use `git clone` to use this library.
The dependency branch has been created, and this module can be used directly.
