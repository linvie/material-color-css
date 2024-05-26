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
  Variant,
  TonalPalette,
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
// let json = JSON.parse(JSON.stringify());
const name = MaterialDynamicColors["onTertiaryFixedVariant"].name;
console.log(name.replace(/_/g, "-"));

// const scheme = new DynamicScheme({
//   sourceColorArgb: 0xffeb0057,
//   variant: Variant.VIBRANT,
//   isDark: false,
//   contrastLevel: 0.0,
//   primaryPalette: TonalPalette.fromInt(0xffeb0057),
//   secondaryPalette: TonalPalette.fromInt(0xfff46b00),
//   tertiaryPalette: TonalPalette.fromInt(0xff00ab46),
//   neutralPalette: TonalPalette.fromInt(0xff949494),
//   neutralVariantPalette: TonalPalette.fromInt(0xffbc8877),
// });
// console.log(scheme);
