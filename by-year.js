function processData(data) {
  const countsPerYear = {};
  const today = new Date();
  data.forEach((item) => {
    const joinYear = new Date(item[2]).getFullYear();
    countsPerYear[joinYear] = countsPerYear[joinYear] || { joins: 0, leaves: 0 };
    countsPerYear[joinYear].joins++;
    if (item[3]) {
      const leaveYear = new Date(item[3]).getFullYear();
      countsPerYear[leaveYear] = countsPerYear[leaveYear] || {
        joins: 0,
        leaves: 0,
      };
      countsPerYear[leaveYear].leaves++;
    }
  });
  const startYear = Object.keys(countsPerYear)[0];
  const endYear = today.getFullYear();
  for (let year = startYear; year <= endYear; year++) {
    countsPerYear[year] = countsPerYear[year] || { joins: 0, leaves: 0 };
  }
  return countsPerYear;
}

function convertDataToArray(countsPerYear) {
  const countsPerYearArray = Object.entries(countsPerYear).map(([year, counts]) => [
    year,
    counts.joins,
  ]);
  countsPerYearArray.unshift(["Year", "New team members"]);
  return countsPerYearArray;
}

function drawBarChart(rows) {
  // https://developers.google.com/chart/interactive/docs/gallery/barchart
  const container = document.getElementById("chart_div");
  const chart = new google.charts.Bar(container);
  const dataTable = new google.visualization.arrayToDataTable(rows);

  const options = {
    bars: "vertical",
    legend: { position: "none" },
    axes: { x: { 0: { label: "" } } },
  };

  chart.draw(dataTable, options);
}

async function getDataAndDrawBarChart() {
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(async function () {
    const csvData = await fetchCsvData();
    const processedData = processData(csvData);
    const dataArray = convertDataToArray(processedData);
    drawBarChart(dataArray);
  });
}
