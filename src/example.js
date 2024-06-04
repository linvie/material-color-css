import "./example.css";

import { updateColors, updateColorFromImage } from "material-color-css";

let scheme;
const color = document.querySelector('input[type="color"]');
color.addEventListener("input", (e) => {
  const color = e.target.value;
  if (scheme) {
    updateColors(color, scheme);
  } else {
    updateColors(color);
  }
});

document.querySelector(".imagebutton").addEventListener("click", () => {
  document.querySelector("#imageInput").click();
});

document.querySelector(".colorbutton").addEventListener("click", () => {
  document.querySelector(".inputcolor").click();
});

document.querySelector(".github").addEventListener("click", () => {
  document.querySelector(".githublink").click();
});

document.querySelector(".xhs").addEventListener("click", () => {
  document.querySelector(".xhslink").click();
});

document.querySelector(".donate").addEventListener("click", () => {
  const donateboard = document.querySelector(".donateboard");
  donateboard.style.display = "block";
});

document.querySelector(".donateboard svg").addEventListener("click", () => {
  const donateboard = document.querySelector(".donateboard");
  donateboard.style.display = "none";
});

document.querySelector(".fontbutton").addEventListener("click", () => {
  const donateboard = document.querySelector(".modes");
  donateboard.style.display = "block";
});

document.querySelector(".modes svg").addEventListener("click", () => {
  const donateboard = document.querySelector(".modes");
  donateboard.style.display = "none";
});

//color from image
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    if (scheme) {
      updateColorFromImage(file, scheme);
    } else {
      updateColorFromImage(file);
    }
  }
});

let c = "default";
let m = "light";
const body = document.querySelector("body");

const contrasts = document.querySelectorAll("input[name='contrast']");
contrasts.forEach((contrast) => {
  contrast.addEventListener("change", () => {
    contrasts.forEach((contrast) => {
      const svg = document.querySelector(`.${contrast.value}_contrast`);
      if (svg) {
        if (svg.classList.contains("selectedsvg")) {
          svg.classList.remove("selectedsvg");
        }
        if (contrast.checked) {
          svg.classList.add("selectedsvg");
          c = contrast.value;
          body.classList.remove(...body.classList);
          body.classList.add(`${m}_${c}_contrast`);
        }
      }
    });
  });
});

const modes = document.querySelectorAll("input[name='mode']");
modes.forEach((mode) => {
  mode.addEventListener("change", () => {
    modes.forEach((mode) => {
      const svg = document.querySelector(`.${mode.value}_mode`);
      if (svg) {
        if (svg.classList.contains("selectedsvg")) {
          svg.classList.remove("selectedsvg");
        }
        if (mode.checked) {
          svg.classList.add("selectedsvg");
          m = mode.value;
          body.classList.remove(...body.classList);
          body.classList.add(`${m}_${c}_contrast`);
        }
      }
    });
  });
});

const vars = document.querySelectorAll(".options div");
vars.forEach((varr) => {
  varr.addEventListener("click", (e) => {
    vars.forEach((v) => {
      v.classList.remove("selected");
    });
    e.target.classList.add("selected");
    let textContent = e.target.textContent;
    let trimmedText = textContent.replace(/\s+/g, "");
    scheme = trimmedText;
    updateColors("#B33B15", scheme);
  });
});
