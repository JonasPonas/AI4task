const express = require("express");
const router = express.Router();

const { readFile, avg, median } = require("../scripts/functions");
const { invalidDataFilter, sexFilter } = require("../scripts/filters");

router.get("/", function (req, res) {
  let met = req.query.met || 0;
  try {
    let patients = readFile();
    let filteredInvalid = patients.filter(invalidDataFilter);

    patients.forEach((patient) => {
      if (patient.ugis == "?") {
        let filteredSex = filteredInvalid.filter(sexFilter, patient.lytis);
        let ugiai = new Array();

        filteredSex.forEach((patient) => {
          ugiai.push(patient.ugis);
        });

        if (met == 0) patient.ugis = String(avg(ugiai));
        else patient.ugis = String(median(ugiai));
      }
    });

    res.send(patients);
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
