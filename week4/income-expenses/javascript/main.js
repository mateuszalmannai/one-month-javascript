var GoogleChartsAPI = {};

GoogleChartsAPI.init = function() {
  google.charts.load('upcoming', { 'packages': ['geochart'] });
}

GoogleChartsAPI.render = function(sheetData, tabletop) {

  UI.render(sheetData);
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
  console.log("In render: " + data);
  var heading = document.createElement('div');
  heading.classList.add('header');
  heading.innerHTML = '<h1>' + data[0].Information + '</h1>';

  var info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = data[1].Information;

  var more_info = document.createElement('div');
  more_info.classList.add('more_info');
  more_info.innerHTML = data[2].Information;

  var conclusion = document.createElement('div');
  conclusion.classList.add('conclusion');
  conclusion.innerHTML = data[3].Information;

  var disclaimer = document.createElement('div');
  disclaimer.classList.add('disclaimer');
  disclaimer.innerHTML = data[4].Information;

  var searchResults = document.querySelector('.js-search-results');
  searchResults.appendChild(heading);
  searchResults.appendChild(info);
  searchResults.appendChild(more_info);
  searchResults.appendChild(conclusion);
  searchResults.appendChild(disclaimer);
}


GoogleChartsAPI.init();
TabletopAPI.init('https://docs.google.com/spreadsheets/d/1wyg34DtndqrWYlbSD-3S9Tw5YxgOWQtcv2p2JdS6L2Q/pubhtml');
// window.addEventListener('DOMContentLoaded', TabletopAPI.init);
// Data Source: https://www.vexcash.com/blog/lebenshaltungskosten-deutschland-2016/
// Try this: https://www.laenderdaten.info/lebenshaltungskosten.php
