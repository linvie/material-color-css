import { updateColors } from "../src/material-colors.js";

const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("clicked");
  updateColors("#ffffff");
});
