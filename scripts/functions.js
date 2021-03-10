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

function median(values) {
  let sorted = values.sort();
  let size = values.length;

  if (size % 2 != 0) return sorted[(size + 1) / 2];
  else return (sorted[size / 2] + sorted[size / 2 + 1]) / 2;
}

function corr(values, ugiai, badValue) {
  let x = 0, y = 0, xy = 0, x2 = 0, y2 = 0;
  let length = parseInt(Object.keys(values).length,10)
  let svoriai = new Array();

  values.forEach((patient) => {
    x += parseInt(patient.ugis,10);
    xy += parseInt(patient.ugis,10) * parseInt(patient.svoris,10);
    y += parseInt(patient.svoris,10);
    x2 += Math.pow(parseInt(patient.ugis,10),2);
    y2 += Math.pow(parseInt(patient.svoris,10),2);
  });

  let corrCoef = ((length * xy - x * y) /
    Math.sqrt(Math.abs((length * x2  - Math.pow(x,2))) * Math.abs((length * y2 - Math.pow(y,2)))))

    values.forEach((patient) => {
      svoriai.push(patient.svoris);
    });

    let avgUgis = avg(ugiai);
    let avgSvoris = avg(svoriai);

  return (avgUgis + (1/corrCoef) * (corrCoef * (parseInt(badValue.svoris)- avgSvoris)));
}



module.exports = { readFile, avg, median, corr };
