const fs = require('fs');
const path = require('path');

const colors = require('./constants/colors.js');
const isDark = require('./colorIsDark.js');

const filePath = path.join(__dirname, 'colors-gen.css'); // should be moved to ./public/css
const cssString = colors.map((color, index) => {
    return `
.color[data="${index}"] {
    background: ${color};
    color: ${isDark(color) ? "white" : "black"};
}`.trim();
}).join("\n");
fs.writeFile(filePath, cssString, err => {
    if (err) {
        throw err;
    }
    console.log("Wrote to file " + filePath);
});
