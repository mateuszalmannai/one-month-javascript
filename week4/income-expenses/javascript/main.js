var GoogleChartsAPI = {};

GoogleChartsAPI.init = function() {
  google.charts.load('upcoming', { 'packages': ['geochart'] });
}

GoogleChartsAPI.render = function(sheetData, tabletop) {

  var chartData = [];
  sheetData.forEach(function(sheetData) {
    chartData.push(new Array(sheetData.City, parseInt(sheetData.Difference), parseInt(sheetData.Income)));
  });

  // Table Headings
  chartData.unshift(new Array(
    tabletop.models.Sheet1.columnNames[0],
    tabletop.models.Sheet1.columnNames[3],
    tabletop.models.Sheet1.columnNames[1]));

  google.charts.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
      region: 'DE',
      displayMode: 'markers',
      colorAxis: { colors: ['yellow', 'blue'] }
    };
    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  };
}

var TabletopAPI = {};

TabletopAPI.init = function(url) {
  Tabletop.init({
    key: url,
    callback: GoogleChartsAPI.render,
    simpleSheet: true
  });
}

var UI = {};

UI.render = function(data) {
  data.forEach(function(data) {
    var section = document.createElement('div');
    section.classList.add('section');
    section.innerHTML = '<h1>' + data.Category + '</h1>';
    var searchResults = document.querySelector('.js-search-results');
    // searchResults.appendChild(section);
  });
  window.addEventListener('DOMContentLoaded', init)
}


GoogleChartsAPI.init();
TabletopAPI.init('https://docs.google.com/spreadsheets/d/1wyg34DtndqrWYlbSD-3S9Tw5YxgOWQtcv2p2JdS6L2Q/pubhtml');
// Data Source: https://www.vexcash.com/blog/lebenshaltungskosten-deutschland-2016/