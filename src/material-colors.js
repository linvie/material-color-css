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
  QuantizerCelebi,
  Score,
} from "material-color-utilities-fork";

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

// color from image
function convertImageToARGB(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject("Invalid file type");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const maxDimension = 128;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageDataToARGB(imageData);
        resolve(pixels);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function imageDataToARGB(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const pixels = new Array(width * height);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const argb = (a << 24) | (r << 16) | (g << 8) | b;
    pixels[i / 4] = argb;
  }
  return pixels;
}

export function updateColorFromImage(file, scheme = "tonalspot") {
  convertImageToARGB(file).then((pixels) => {
    const quantizerResult = QuantizerCelebi.quantize(pixels, 128);
    const colors = Score.score(quantizerResult);
    // console.log(hexFromArgb(colors[0]))
    updateColors(hexFromArgb(colors[0]), scheme);
  });
}
