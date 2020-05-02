import moment from 'moment';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';

const resetFormValues = () => {
  $('#date1').val('');
  $('#date2').val('');
  $('#date3').val('');
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

const getIngredientsReport = () => new Promise((resolve, reject) => {
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
  let domString = '';
  getProperArray(modifiedDate1, modifiedDate2).then((results) => {
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
    utils.printToDom('ingredient-reporting-section', domString);
    resolve(results);
    resetFormValues();
  }).catch((err) => reject(err));
});


const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { ingredientReportEvents };
