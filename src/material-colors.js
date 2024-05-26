import {
  argbFromHex,
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  SchemeRainbow,
  SchemeFruitSalad,
} from "../node_modules/@material/material-color-utilities/index.js";

function setColorFromScheme([mode, contrast, scheme], colorName) {
  const palette = MaterialDynamicColors[colorName];
  if (palette) {
    const color = hexFromArgb(palette.getArgb(scheme));
    const originalName = palette.name;
    const propertyName = originalName.replace(/_/g, "-");
    const styleProperty = `--${mode}-${contrast}-${propertyName}`;
    document.documentElement.style.setProperty(styleProperty, color);
  } else console.error(`${paletteName} doesn't exist!`);
}

function colorScheme(sourceColor, type, mode, contrast) {
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

  if (typeof type === "string") {
    type = type.toLowerCase();
  } else {
    console.error("type is not a string");
  }
  let scheme;
  if (type === "content") {
    scheme = new SchemeContent(hct, isDark, contrastLevel);
  } else if (type === "expressive") {
    scheme = new SchemeExpressive(hct, isDark, contrastLevel);
  } else if (type === "fidelity") {
    scheme = new SchemeFidelity(hct, isDark, contrastLevel);
  } else if (type === "fruitsalad") {
    scheme = new SchemeFruitSalad(hct, isDark, contrastLevel);
  } else if (type === "monochrome") {
    scheme = new SchemeMonochrome(hct, isDark, contrastLevel);
  } else if (type === "rainbow") {
    scheme = new SchemeRainbow(hct, isDark, contrastLevel);
  } else if (type === "tonalspot") {
    scheme = new SchemeTonalSpot(hct, isDark, contrastLevel);
  } else if (type === "vibrant") {
    scheme = new SchemeVibrant(hct, isDark, contrastLevel);
  } else if (type === "neutral") {
    scheme = new SchemeNeutral(hct, isDark, contrastLevel);
  } else console.error("scheme type error");

  return [mode, contrast, scheme];
}

export function updateColors(sourceColor, schemeType = "tonalspot") {
  const mode = ["light", "dark"];
  const contrast = ["default", "medium", "high"];
  const colorName = [
    "background",
    "onBackground",
    "surface",
    "surfaceDim",
    "surfaceBright",
    "surfaceContainerLowest",
    "surfaceContainerLow",
    "surfaceContainer",
    "surfaceContainerHigh",
    "surfaceContainerHighest",
    "onSurface",
    "surfaceVariant",
    "onSurfaceVariant",
    "inverseSurface",
    "inverseOnSurface",
    "outline",
    "outlineVariant",
    "shadow",
    "scrim",
    "surfaceTint",
    "primary",
    "onPrimary",
    "primaryContainer",
    "onPrimaryContainer",
    "inversePrimary",
    "secondary",
    "onSecondary",
    "secondaryContainer",
    "onSecondaryContainer",
    "tertiary",
    "onTertiary",
    "tertiaryContainer",
    "onTertiaryContainer",
    "error",
    "onError",
    "errorContainer",
    "onErrorContainer",
    "primaryFixed",
    "primaryFixedDim",
    "onPrimaryFixed",
    "onPrimaryFixedVariant",
    "secondaryFixed",
    "secondaryFixedDim",
    "onSecondaryFixed",
    "onSecondaryFixedVariant",
    "tertiaryFixed",
    "tertiaryFixedDim",
    "onTertiaryFixed",
    "onTertiaryFixedVariant",
  ];

  mode.forEach((mo) => {
    contrast.forEach((co) => {
      const param = colorScheme(sourceColor, schemeType, mo, co);
      colorName.forEach((cn) => {
        setColorFromScheme(param, cn);
      });
    });
  });
}
