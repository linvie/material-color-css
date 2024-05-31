基于 Material Design [动态颜色程序](https://github.com/material-foundation/material-color-utilities/tree/main)的 CSS 生成模块。采用实时更新 CSS 和 CSS 变量引用的方式让网页实现动态颜色变得更简单。

[**效果网页**](https://linvie.github.io/material-color-css/)

## 开始

```cli
npm i material-color-css
```

将生成的 CSS 移动到根目录

**windows**

```
move "./node_modules/material-color-css/public" "."
```

**Unix/Linux/macOS**

```
mv "./node_modules/material-color-css/public" "."
```

将 CSS 写到 `/public/css/style.css` 并引入 `index.html` 或 将 `/public/css/material-colors.css` 直接引入你的 css 文件

## 使用

`material-colors.css` 中 CSS 变量名如下构成

```
--< light / dark>-< default / medium / high >-< color name>
// --模式-对比度-颜色名
```

如果网页没有切换深/浅模式 和 对比度 的需求，建议保持前两个参数不变，选择同一类下的颜色

具体颜色选择方法，请参考 Material Design 中 [color roles](https://m3.material.io/styles/color/roles)一节

将变量引入 CSS 文件，即可使用

```
//your css
@import url("material-colors.css");

body {
    background-color: var(--token-name);
    color: var(--token-name);
  }
```

更新颜色

```
//your js
import { updateColors,updateColorFromImage } from "material-color-css"

updateColors(sourceColor, scheme)
// sourceColor 应该为 十六进制格式颜色 如 "#431104"
// scheme 为可选项， 默认为"tonalspot", 该参数是使用不同的颜色模板，作为参数时需要去除空格

updateColorFromImage(file, scheme)
//file 为图片文件

e.g.
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

颜色模板

共有九种不同的颜色模板，官方介绍如下，可通过[网页](https://linvie.github.io/material-color-css/)查看效果

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

## 注意

Material Design [动态颜色程序](https://github.com/material-foundation/material-color-utilities/tree/main) 的 NPM 包已经长时间没有更新，在使用 Rainbow 和 FruitSalad 模板时存在未定义问题，参见[issue](https://github.com/material-foundation/material-color-utilities/issues/137)

**解决方案：**

参考 issue 修改模块中的引用 或 采用 `git clone`方式使用本库。
