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

const ingredientChart = () => new Promise((resolve, reject) => {
  const dates = helper.dateCheck();
  const startDate = dates[0];
  const endDate = dates[1];
  const chartData = [];
  const chartLabels = [];
  const chartDiv = 'ingredient-chart';
  getProperArray(startDate, endDate).then((results) => { // dateCheck returns an array! Hence the index #'s
    Object.entries(results).forEach((result) => {
      const ingredient = result[0];
      const ingredientCount = result[1];
      chartData.push(ingredientCount);
      chartLabels.push(ingredient);
    });
    chart.chartBuilder(chartDiv, chartLabels, chartData);
    helper.resetFormValues();
    resolve(results);
  }).catch((err) => reject(err));
});

const getIngredientsReport = () => {
  const dates = helper.dateCheck();
  const startDate = dates[0];
  const endDate = dates[1];
  helper.showIngredientsTab();
  helper.ingredientDivBuilder(startDate, endDate);
  $(document).ready(ingredientChart());
  helper.resetFormValues();
};

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { ingredientReportEvents };
