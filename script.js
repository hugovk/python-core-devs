function getDataAndDrawChart(showCurrent = true, showFormer = true) {
  const url =
    "https://raw.githubusercontent.com/python/devguide/main/core-developers/developers.csv";
  const today = new Date();

  d3.text(url).then(function (csvText) {
    // Parse the CSV data into an array of objects
    let data = d3.csvParseRows(csvText, d3.autoType, function (d) {
      return d;
    });

    // Oldest first
    data.reverse();

    if (!showFormer) {
      // Filter out former core developers
      data = data.filter(function (d) {
        return d[3] === null;
      });
    }

    if (!showCurrent) {
      // Filter out current core developers
      data = data.filter(function (d) {
        return d[3] !== null;
      });
    }

    for (let i = 0; i < data.length; i++) {
      // Remove the last element: "Notes"
      data[i] = data[i].slice(0, -1);
      // Set second element to third element
      data[i][1] = data[i][2].toISOString().slice(0, 10);
      // If no "Left" date, use today
      if (data[i][3] === null) {
        data[i][3] = today;
      } else {
        // Append leaving date to second element
        data[i][1] += " to " + data[i][3].toISOString().slice(0, 10);
      }
    }
    drawChart(data);
  });
}

function drawChart(rows) {
  // https://developers.google.com/chart/interactive/docs/gallery/timeline
  let container = document.getElementById("chart_div");
  let chart = new google.visualization.Timeline(container);
  let dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: "string", id: "Name" });
  dataTable.addColumn({ type: "string", id: "Term" });
  dataTable.addColumn({ type: "date", id: "Start" });
  dataTable.addColumn({ type: "date", id: "End" });

  dataTable.addRows(rows);

  let options = {
    timeline: { colorByRowLabel: true },
  };

  chart.draw(dataTable, options);
}
