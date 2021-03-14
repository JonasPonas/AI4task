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

module.exports = router;
