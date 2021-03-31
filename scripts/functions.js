const fs = require("fs");

const Apex = require("./apex");

function readFile() {
  try {
    var data = fs.readFileSync("virsunes.csv", "utf8");
    const lines = data.split("\n");

    let virsunes = [];
    for (var i = 1; i < lines.length; i++) {
      let col = lines[i].split(",");
      virsunes.push(
        new Apex(col[0], col[1], col[2], col[3].replace(/[\r\n]+/gm, ""))
      );
    }
    return virsunes;
  } catch (e) {
    return null;
  }
}

function prim(array) {
  var minTree = new Array();
  var insert_FLAG = true;

  var firstRndApex = array[Math.floor(Math.random() * array.length)].pradine;

  var lowestDistance = new Apex();
  lowestDistance.pradine = "Z";
  lowestDistance.atstumas = 100;

  array.forEach((element) => {
    if (
      element.pradine == firstRndApex &&
      parseInt(lowestDistance.atstumas) > parseInt(element.atstumas)
    ) {
      lowestDistance = element;
    }
  });

  minTree.push(lowestDistance);

  do {
    var lowestDistance = new Apex();
    lowestDistance.pradine = "Z";
    lowestDistance.atstumas = 100;

    if (minTree.length > 0) {
      minTree.forEach((element) => {
        array.forEach((x) => {
          if (element.galine == x.pradine || x.galine == element.pradine) {
            minTree.forEach((y) => {
              if (y.pradine == x.pradine && y.galine == x.galine) {
                insert_FLAG = false;
              }
              if (y.pradine == x.galine && y.galine == x.pradine) {
                insert_FLAG = false;
              }
            });

            if (insert_FLAG) {
              var pradiniuCount = 0;
              var galiniuCount = 0;

              for (i = 0; i < minTree.length; i++) {
                if (
                  minTree[i].pradine == x.pradine ||
                  minTree[i].pradine == x.galine
                ) {
                  pradiniuCount = parseInt(pradiniuCount) + 1;
                }
                if (
                  minTree[i].galine == x.galine ||
                  minTree[i].galine == x.pradine
                ) {
                  galiniuCount = parseInt(galiniuCount) + 1;
                }
              }

              if (parseInt(pradiniuCount) > 1 || parseInt(galiniuCount) > 1) {
                insert_FLAG = false;
              }
            }

            if (
              insert_FLAG &&
              parseInt(lowestDistance.atstumas) > parseInt(x.atstumas)
            ) {
              lowestDistance = x;
            } else {
              insert_FLAG = true;
            }
          }
        });
      });

      if (lowestDistance.pradine != "Z") {
        minTree.push(lowestDistance);
      }
    }
  } while (lowestDistance.pradine != "Z");

  if (minTree.length == 7) {
    minTree.pop();
  }

  return minTree;
}

function clusterize(minTree) {
  let removedPoints = minTree.sort((a, b) => b.atstumas - a.atstumas);
  removedPoints.shift();
  removedPoints.shift();

  let final = Array();
  let firstPoint = removedPoints.shift();
  let klasteris = 1;

  removedPoints.forEach((point) => {
    point.klasteris = 99;
  });

  while (true) {
    firstPoint.klasteris = klasteris;
    final.push(firstPoint);
    if (removedPoints.length == 0) break;
    removedPoints.forEach((point) => {
      if (point != klasteris) {
        if (
          firstPoint.pradine == point.pradine ||
          firstPoint.galine == point.pradine ||
          firstPoint.pradine == point.galine ||
          firstPoint.galine == point.galine
        ) {
          point.klasteris = klasteris;
        }
      }
    });
    removedPoints = removedPoints.sort((a, b) => a.klasteris - b.klasteris);
    firstPoint = removedPoints.shift();
    if (firstPoint.klasteris == 99) klasteris++;
  }

  return final;
}

module.exports = {
  readFile,
  prim,
  clusterize,
};
