import moment from 'moment';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';

const getIngredientsReport = () => new Promise((resolve, reject) => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const modifiedDate1 = moment(date1).format('YYYY/MM/DD');
  const modifiedDate2 = moment(date2).format('YYYY/MM/DD');
  let domString = '';
  const flatNames = [];
  const counts = {};
  smash.getIngredientsForDateRange(modifiedDate1, modifiedDate2).then((results) => {
    results.forEach((result) => {
      console.error(result, 'result');
      const singleArray = result.flat();
      const names = [];
      singleArray.forEach((obj) => { if (obj) names.push(obj.name); });
      const newNames = Object.keys(names).map((key) => [names[key]]);
      const newFlatNames = newNames.flat();
      flatNames.push(newFlatNames);
      console.error(counts, 'counts in');
    });
    console.error(flatNames, 'flatNames');
    const bigFlatNames = flatNames.flat();
    console.error(bigFlatNames);
    bigFlatNames.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    console.error(counts, 'counts');
    Object.entries(counts).forEach((count) => {
      const key = count[0];
      const value = count[1];
      domString += '<div class="card col-3">';
      domString += '<div class="card-body">';
      domString += `${key} x ${value}`;
      domString += '</div>';
      domString += '</div>';
      console.error(count, 'count');
    });
    utils.printToDom('ingredient-reporting-section', domString);
  }).catch((err) => reject(err));
});

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { ingredientReportEvents };
