const express = require("express");
const router = express.Router();

const { readFile, prim } = require("../scripts/functions");

router.get("/", function (req, res) {
  //try {
    let apexes = readFile();

    res.send(prim(apexes));
  //} catch {
   // res.status(500).send();
 // }
});

module.exports = router;
