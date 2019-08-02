const fs = require("fs");

const result = fs.readFileSync(`${__dirname}/cdkdeployresult.txt`, {
  encoding: "utf-8"
});

const lines = result.split("\n");
var line = 0;

for (line = 0; line < lines.length; line++) {
  if (lines[line] === "Outputs:") {
    line++;
    break;
  }
}

var awsOutputs = {};

while (line < lines.length && lines[line] !== "") {
  try {
    var key = lines[line].split("=")[0].trim();
    key = key.split(".")[key.split(".").length - 1];
    awsOutputs[key] = lines[line].split("=")[1].trim();
  } catch (e) {
    console.log(awsOutputs, lines[line]);
    throw e;
  }
  line++;
}

var outputs = {};

try {
  const resultConfig = fs.readFileSync(`${__dirname}/src/config.js`, {
    encoding: "utf-8"
  });
  const linesConfig = resultConfig.split("\n");
  var objectText = "";
  var lineConfig = 0;
  while (lineConfig < linesConfig.length && linesConfig[lineConfig] !== "") {
    if (linesConfig[lineConfig].substring(0, 2) !== "//") {
      objectText += linesConfig[lineConfig];
    }
    lineConfig++;
  }
  objectText = objectText.substring(15, objectText.length - 1);
  console.log(objectText);
  outputs = JSON.parse(objectText);
} catch (e) {
  console.log(
    "There was an error loading the exiting config file. If this is the first time you have run this command, this is not a problem.",
    e
  );
}

outputs.aws = awsOutputs;

const configtxt =
  "// This is an auto generated file. Any edits will be overwritten\nexport default " +
  JSON.stringify(outputs) +
  ";";

fs.writeFile("src/config.js", configtxt, function(err) {
  if (err) throw err;
  console.log("config file saved!");
});
