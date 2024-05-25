import {
  themeFromSourceColor,
  themeFromImage,
  argbFromHex,
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  DynamicScheme,
  SchemeContent,
  SchemeFidelity,
  SchemeRainbow,
} from "@material/material-color-utilities";

// const theme = themeFromSourceColor(argbFromHex("#ffffff"));
// let json = JSON.parse(JSON.stringify(theme.schemes));

// function setColor(theme, paletteType, tone) {
//   const palette = theme.palettes[paletteType];
//   if (!palette) {
//     console.error(` There is not ${paletteType} `);
//     return;
//   }

//   const color = hexFromArgb(palette.tone(tone));
//   console.log(color);
// }
// setColor(theme, "primary", 80);

const color = Hct.fromInt(argbFromHex("#ffffff"));
// const scheme = new SchemeTonalSpot(color, false, 0.0);
const scheme = new SchemeRainbow(color, false, 0.0);

const primary = hexFromArgb(
  MaterialDynamicColors["onPrimaryFixed"].getArgb(scheme)
);
let json = JSON.parse(JSON.stringify(scheme));
console.log(json);
