import moment from 'moment';
import Plotly from 'plotly.js-dist';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';


const resetFormValues = () => {
  $('#date1').val('');
  $('#date2').val('');
  $('#date3').val('');
};

const dateCheck = () => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const date3 = $('#date3').val();
  let modifiedDate1 = '';
  let modifiedDate2 = '';
  if (date3 === '') {
    modifiedDate1 = moment(date1).format('YYYY/MM/DD');
    modifiedDate2 = moment(date2).format('YYYY/MM/DD');
  } else {
    modifiedDate1 = moment(date3).format('YYYY/MM/DD');
    modifiedDate2 = moment(date3).format('YYYY/MM/DD');
  }
  return [modifiedDate1, modifiedDate2];
};

const getProperArray = (start, end) => new Promise((resolve, reject) => {
  const names = [];
  const counts = {};
  smash.getIngredientsForDateRange(start, end).then((results) => {
    results.forEach((result) => {
      const singleArray = result.flat();
      singleArray.forEach((obj) => { if (obj) names.push(obj.name); }); // pulls name out of ingredient object and into array of names
    });
    // concisely iterates [names] and creates an object with the ingredient name as the key and the names count as the value
    names.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    resolve(counts);
  }).catch((err) => reject(err));
});

const ingredientChart = () => new Promise((resolve, reject) => {
  const dates = dateCheck();
  const chartData = [];
  const chartLabels = [];
  const chart = 'myChart';
  getProperArray(dates[0], dates[1]).then((results) => {
    Object.entries(results).forEach((result) => {
      const key = result[0];
      const value = result[1];
      chartData.push(value);
      chartLabels.push(key);
    });
    console.error(Array.isArray(chartData), 'data is array?');
    console.error(chartData, 'data');
    console.error(typeof chartLabels, 'labels');
    console.error(chartLabels, 'labels');
    Plotly.newPlot(chart, [{
      x: chartLabels,
      y: chartData,
      type: 'bar',
    }]);
    resetFormValues();
    resolve(results);
  }).catch((err) => reject(err));
});

const getIngredientsReport = () => new Promise((resolve, reject) => {
  const dates = dateCheck();
  let domString = '';
  getProperArray(dates[0], dates[1]).then((results) => {
    domString += '<div id="card-container" class="col-12 flex row">';
    domString += '<h4 class="col-12" style="text-align: center;">Inventory Used</h4>';
    Object.entries(results).forEach((result) => {
      const key = result[0];
      const value = result[1];
      domString += '<div class="card col-3">';
      domString += '<div class="card-body">';
      domString += `${key} x ${value}`;
      domString += '</div>';
      domString += '</div>';
    });
    domString += '</div>';
    domString += '<div id="myChart"></div>';
    utils.printToDom('ingredient-reporting-section', domString);
    resolve(results);
    $(document).ready(ingredientChart());
    resetFormValues();
  }).catch((err) => reject(err));
});

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { getIngredientsReport, ingredientReportEvents };
