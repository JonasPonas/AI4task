const express = require("express");
const router = express.Router();

const { readFile, prim, clusterize } = require("../scripts/functions");

router.get("/", function (req, res) {
  //try {
  let apexes = readFile();

  res.send(prim(apexes));
  //} catch {
  // res.status(500).send();
  // }
});

router.get("/clusters", function (req, res) {
  let apexes = readFile();

  res.send(clusterize(prim(apexes)));
});

module.exports = router;
