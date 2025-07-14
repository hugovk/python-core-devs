async function fetchCsvData() {
  const url =
    "https://raw.githubusercontent.com/python/devguide/main/core-team/core-team.csv";
  const response = await fetch(url);
  const csvText = await response.text();
  return d3.csvParseRows(csvText, d3.autoType);
}

function filterData(data, showCurrent, showFormer) {
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

  return data;
}

function cleanData(data) {
  const today = new Date();

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

  return data;
}

function drawChart(rows) {
  // https://developers.google.com/chart/interactive/docs/gallery/timeline
  const container = document.getElementById("chart_div");
  const chart = new google.visualization.Timeline(container);
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: "string", id: "Name" });
  dataTable.addColumn({ type: "string", id: "Term" });
  dataTable.addColumn({ type: "date", id: "Start" });
  dataTable.addColumn({ type: "date", id: "End" });

  dataTable.addRows(rows);

  const options = {
    timeline: { colorByRowLabel: true },
  };

  chart.draw(dataTable, options);
}

async function getDataAndDrawChart(showCurrent = true, showFormer = true) {
  google.charts.load("current", { packages: ["timeline"] });
  google.charts.setOnLoadCallback(async function () {
    const csvData = await fetchCsvData();
    const filteredData = filterData(csvData, showCurrent, showFormer);
    const cleanedData = cleanData(filteredData);
    drawChart(cleanedData);
    console.table(filteredData);
  });
}
