import {
  updateColors,
  colorFromImage,
} from "./node_modules/material-color-css/index.js";

const button = document.querySelector("button");
button.addEventListener("click", () => {
  updateColors("#ffffff");
});

const color = document.querySelector('input[type="color"]');
color.addEventListener("input", (e) => {
  const color = e.target.value;
  // console.log(color);
  updateColors(color);
});

//color from image
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  colorFromImage(file);
});
