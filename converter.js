const {CheatSheet} = require("./cheatsheet.js");

const convertToCss = (classNames) => {
  let cssCode = ``;
  CheatSheet.forEach((element) => {
    element.content.forEach((content) => {
      content.table.forEach((list) => {
        if (classNames.includes(list[0])) {
          const semicolon = list[1][list[1].length - 1] !== ";" ? ";" : "";
          if (list.length === 3) cssCode += `${list[1]}${semicolon} \n`;
          else cssCode += `${list[2]}${semicolon} \n`;
        }

        if (classNames.includes(list[1])) {
          const semicolon = list[2][list[2].length - 1] !== ";" ? ";" : "";
          cssCode += `${list[2]}${semicolon} \n`;
        }
      });
    });
  });
  return cssCode;
};

const getBreakPoints = (input, breakpoint) => {
  return input
    .split(" ")
    .filter((i) => i.startsWith(breakpoint + ":"))
    .map((i) => "." + i.substring(3));
};

const processInput = (input) => {
  const classNames = input.split(/\s+/).map((i) => "." + i.trim());
  const breakpoints = CheatSheet[0].content[3].table;

  const smClasses = getBreakPoints(input, "sm");
  const mdClasses = getBreakPoints(input, "md");
  const lgClasses = getBreakPoints(input, "lg");
  const xlClasses = getBreakPoints(input, "xl");
  const _2xlClasses = getBreakPoints(input, "2xl");

  let resultCss = `${convertToCss(classNames)}
${
  smClasses.length !== 0
    ? breakpoints[0][1].replace("...", "\n  " + convertToCss(smClasses))
    : ""
}
${
  mdClasses.length !== 0
    ? breakpoints[1][1].replace("...", "\n  " + convertToCss(mdClasses))
    : ""
}
${
  lgClasses.length !== 0
    ? breakpoints[2][1].replace("...", "\n  " + convertToCss(lgClasses))
    : ""
}
${
  xlClasses.length !== 0
    ? breakpoints[3][1].replace("...", "\n  " + convertToCss(xlClasses))
    : ""
}
${
  _2xlClasses.length !== 0
    ? breakpoints[4][1].replace("...", "\n  " + convertToCss(_2xlClasses))
    : ""
}
`;

  return resultCss;
};

const createCssClass = (input, fileName, type, n) => {
  return (
    "." +
    fileName +
    "-" +
    type +
    "-" +
    n +
    " {\n" +
    processInput(input) +
    "\n}\n"
  );
};

const convert = (file) => {
  fs.readFile(file + ".jsp", "utf8", function (err, data) {
    if (err) throw err;
    let soup = new JSSoup(data);

    fs.writeFile(
      outFolder + file + ".css",
      "/* Clases para " + file + " */ \n",
      function (err, data) {
        if (err) throw err;
      }
    );

    for (let type of types) {
      let type_nodes = soup.findAll(type);

      type_nodes.forEach((element, i) => {
        if (element.attrs.class !== undefined) {
          let css = createCssClass(element.attrs.class, file, type, i);

          element.attrs.class = file + "-" + type + "-" + i;
          fs.appendFile(outFolder + file + ".css", css, function (err) {
            if (err) throw err;
          });
        }
      });
    }

    fs.writeFile(
      outFolder + file + ".jsp",
      soup.prettify(),
      function (err, data) {
        if (err) throw err;
      }
    );
  });
};

var JSSoup = require("jssoup").default;
var fs = require("fs");

const outFolder = "./out/";

const types = ["body", "div", "button", "class", "h1", "h2", "h3", "h4", "h5"];
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
