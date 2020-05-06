/* eslint-disable no-plusplus */
import chart from '../../helpers/chart';
import helper from '../../helpers/ingredientReportHelpers';
import smash from '../../helpers/data/smashData';


const getProperArray = (start, end) => new Promise((resolve, reject) => {
  const names = [];
  const counts = {};
  smash.getIngredientsForDateRange(start, end).then((results) => {
    results.forEach((result) => {
      const singleArray = result.flat();
      singleArray.forEach((obj) => { if (obj) names.push(obj.name); }); // pulls name out of ingredient object and into array of names
    });
    // concisely iterates [names] and creates an object with the ingredient name as the key and its count as the value
    names.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    resolve(counts);
  }).catch((err) => reject(err));
});

const ingredientChart = (startDate, endDate) => new Promise((resolve, reject) => {
  const chartData = [];
  const chartLabels = [];
  const chartDiv = 'ingredient-chart';
  getProperArray(startDate, endDate).then((results) => {
    const respArray = Object.entries(results);
    for (let i = 0, n = respArray.length; i < n; ++i) {
      const ingredient = respArray[i][0];
      const ingredientCount = respArray[i][1];
      chartData.push(ingredientCount);
      chartLabels.push(ingredient);
    }
    $(document).ready(chart.chartBuilder(chartDiv, chartLabels, chartData));
    helper.resetFormValues();
    resolve(results);
  }).catch((err) => reject(err));
});

const getIngredientsReport = () => {
  const dates = helper.dateCheck();
  const startDate = dates[0];
  const endDate = dates[1];
  helper.showIngredientsTab();
  helper.clearIngredientChart();
  helper.ingredientDivBuilder(startDate, endDate);
  ingredientChart(startDate, endDate);
  helper.resetFormValues();
};

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { ingredientReportEvents };
