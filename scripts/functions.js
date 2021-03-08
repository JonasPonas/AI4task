const fs = require("fs");

const Patient = require("./patient");

function readFile() {
  try {
    var data = fs.readFileSync("pacientai.csv", "utf8");
    const lines = data.split("\n");

    let pacientai = [];
    for (var i = 1; i < lines.length; i++) {
      let col = lines[i].split(",");
      pacientai.push(
        new Patient(
          col[0],
          col[1],
          col[2],
          col[3],
          col[4].replace(/[\r\n]+/gm, "")
        )
      );
    }
    return pacientai;
  } catch (e) {
    return null;
  }
}

function avg(values) {
  let sum = 0;
  values.forEach((val) => {
    sum += Number(val);
  });
  return Math.round(sum / values.length);
}

module.exports = { readFile, avg };
