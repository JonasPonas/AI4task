const express = require("express");
const router = express.Router();

const { readFile } = require("../scripts/functions");

router.get("/", function (req, res) {
  try {
    res.send(readFile());
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
