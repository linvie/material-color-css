const fs = require("fs");
const path = require("path");

// Ensure the target directory exists
const targetDir = path.join(process.cwd(), "public/css");
fs.mkdirSync(targetDir, { recursive: true });

// Copy the styles.css to the target directory
const sourceFile_1 = path.join(__dirname, "../src/material-colors.css");
const targetFile_1 = path.join(targetDir, "material-colors.css");

const sourceFile_2 = path.join(__dirname, "../src/style.css");
const targetFile_2 = path.join(targetDir, "style.css");

fs.copyFileSync(sourceFile_1, targetFile_1);
console.log(`Copied material-colors.css to ${targetFile_1}`);

fs.copyFileSync(sourceFile_2, targetFile_2);
console.log(`Copied style.css to ${targetFile_2}`);
