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
          col[4],
          col[5],
          col[6],
          col[7],
          col[8],
          col[9],
          col[10],
          col[11].replace(/[\r\n]+/gm, "")
        )
      );
    }
    return pacientai;
  } catch (e) {
    return null;
  }
}

function kmeans(arrayToProcess, Clusters) {

  var Groups = new Array();
  var Centroids = new Array();

  var oldCentroids = new Array();
  var changed = false;

  for (initGroups = 0; initGroups < Clusters; initGroups++) {
      Groups[initGroups] = new Array();
  }

  initialCentroids = Math.round(arrayToProcess.length / (Clusters + 1));

  for (i = 0; i < Clusters; i++) {
      Centroids[i] = arrayToProcess[(initialCentroids * (i + 1))];
  }

  do {
      for (j = 0; j < Clusters; j++) {
          Groups[j] = [];
      }

      changed = false;

      for (i = 0; i < arrayToProcess.length; i++) {
          Distance = -1;
          oldDistance = -1

          for (j = 0; j < Clusters; j++) {

              distance = Math.sqrt(Math.pow(( arrayToProcess[i].karsciavimas - Centroids[j].karsciavimas), 2) +
              Math.pow((arrayToProcess[i].kosulys - Centroids[j].kosulys), 2) + 
              Math.pow((arrayToProcess[i].nuovargis - Centroids[j].nuovargis), 2) + 
              Math.pow((arrayToProcess[i].sunkumas - Centroids[j].sunkumas), 2) + 
              Math.pow((arrayToProcess[i].skausmas - Centroids[j].skausmas), 2) + 
              Math.pow((arrayToProcess[i].judesiai - Centroids[j].judesiai), 2) + 
              Math.pow((arrayToProcess[i].kosulys - Centroids[j].kosulys), 2) + 
              Math.pow((arrayToProcess[i].galva - Centroids[j].galva), 2) + 
              Math.pow((arrayToProcess[i].konjutivytas - Centroids[j].konjutivytas), 2) + 
              Math.pow((arrayToProcess[i].viduriavimas - Centroids[j].viduriavimas), 2) + 
              Math.pow((arrayToProcess[i].gerkle - Centroids[j].gerkle), 2));

              if (oldDistance == -1) {
                  oldDistance = distance;
                  newGroup = j;
              } else if (distance <= oldDistance) {
                  newGroup = j;
                  oldDistance = distance;
              }
          }
          Groups[newGroup].push(arrayToProcess[i]);
      }
      oldCentroids = Centroids;
      for (j = 0; j < Clusters; j++) {
          total = 0;

          newCentroid = 0;
          newCentroid = Groups[j][Groups[j].length/2]
          Centroids[j] = newCentroid;
      }
      for (j = 0; j < Clusters; j++) {
          if (JSON.stringify(Centroids[j]) != JSON.stringify(oldCentroids[j])) {
              changed = true;
          }
      }
  } while (changed == true);

  for (i = 0; i < Groups.length; i ++) {
      for (j = 0; j < Groups[i].length;j++) {
          Groups[i][j].klasteris = i;
        }
      
  }
  return Groups;
}

module.exports = { readFile, kmeans };
