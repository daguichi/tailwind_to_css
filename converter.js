var fs = require("fs");
const { convert } = require("./methods.js");
const { outFolder } = require("./config.js");
let files = process.argv.slice(2);
const files_names = files.map((element) => {
  return element.split(".")[0];
});

try {
  if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder);
  }
} catch (err) {
  console.error(err);
}

for (let file of files_names) {
  convert(file);
}
