const express = require("express");
const router = express.Router();

const { readFile, kmeans } = require("../scripts/functions");

router.get("/", function (req, res) {
  try {
    let patients = readFile();

    res.send(kmeans(patients, 3));
  } catch {
    res.status(500).send();
  }
});

router.get("/filter", function (req, res) {
  try {
    let patients = readFile();

    let clustered = kmeans(patients, 3);

    for (let i = 0; i < clustered.length - 2; i++) {
      const result = clustered[i].find(
        ({ pacientas }) => pacientas === "Vardas1"
      );
      if (result != undefined) res.send(clustered[i]);
    }
    res.status(404).send();
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
