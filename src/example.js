import "./example.css";

import { updateColors, colorFromImage } from "material-color-css";

const color = document.querySelector('input[type="color"]');
color.addEventListener("input", (e) => {
  const color = e.target.value;
  updateColors(color);
});

//color from image
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  colorFromImage(file);
});
