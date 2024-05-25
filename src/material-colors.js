import {
  argbFromHex,
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  DynamicColor,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  SchemeRainbow,
} from "@material/material-color-utilities";

export default function setColor(
  sourceColor,
  mode,
  contrast,
  paletteName,
  styleProperty
) {
  const hct = Hct.fromInt(argbFromHex(sourceColor));

  let isDark;
  if (mode === "light") isDark = false;
  else if (mode === "dark") isDark = true;
  else console.error("mode must be light or dark!");

  let contrastLevel;
  if (contrast === "default") contrastLevel = 0.0;
  else if (contrast === "medium") contrastLevel = 0.5;
  else if (contrast === "high") contrastLevel = 1.0;
  else if (contrast === "reduced") contrastLevel = -1.0;
  else console.error("contrast type error!");

  const scheme = new SchemeTonalSpot(hct, isDark, contrastLevel);
  const palette = MaterialDynamicColors[paletteName];
  if (palette) {
    const color = hexFromArgb(palette.getArgb(scheme));
    document.documentElement.style.setProperty(styleProperty, color);
  } else console.error(`${paletteName} doesn't exist!`);
}

function colorScheme(type, hct, isDark, contrastLevel) {
  type.toLowercase();
  if (type === "content") {
    const scheme = new SchemeContent(hct, isDark, contrastLevel);
  } else if (type === "expressive") {
    const scheme = new SchemeExpressive(hct, isDark, contrastLevel);
  } else if (type === "fidelity") {
    const scheme = new SchemeFidelity(hct, isDark, contrastLevel);
  } else if (type === "fruitsalad") {
    const scheme = new SchemeFruitSalad(hct, isDark, contrastLevel);
  } else if (type === "monochrome") {
    const scheme = new SchemeMonochrome(hct, isDark, contrastLevel);
  } else if (type === "rainbow") {
    const scheme = new SchemeRainbow(hct, isDark, contrastLevel);
  } else if (type === "tonalspot") {
    const scheme = new SchemeTonalSpot(hct, isDark, contrastLevel);
  } else if (type === "vibrant") {
    const scheme = new SchemeVibrant(hct, isDark, contrastLevel);
  } else if (type === "neutral") {
    const scheme = new SchemeNeutral(hct, isDark, contrastLevel);
  } else console.error("scheme type error");
}

function updateColors(sourceColor) {}
