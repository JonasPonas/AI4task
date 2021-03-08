const fs = require("fs");

function readFile() {
  try {
    var data = fs.readFileSync("pacientai.csv", "utf8");
    const lines = data.split("\n");

    let pacientai = [];
    for (var i = 1; i < lines.length; i++) {
      let col = lines[i].split(",");
      pacientai.push({
        idobject: col[0],
        pacientas: col[1],
        lytis: col[2],
        ugis: col[3],
        svoris: col[4].replace(/[\r\n]+/gm, ""),
      });
    }
    return pacientai;
  } catch (e) {
    return null;
  }
}

module.exports = {
  readFile,
};
