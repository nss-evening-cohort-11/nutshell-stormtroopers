import moment from 'moment';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';


const getIngredientsReport = () => new Promise((resolve, reject) => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const modifiedDate1 = moment(date1, 'YYYY/MM/DD').format('YYYY/MM/DD');
  const modifiedDate2 = moment(date2, 'YYYY/MM/DD').format('YYYY/MM/DD');
  let domString = '';
  smash.getIngredientsForDateRange(modifiedDate1, modifiedDate2).then((results) => {
    results.forEach((result) => {
      const singleArray = result.flat();
      singleArray.forEach((obj) => {
        if (obj) {
          domString += '<div class="card col-3">';
          domString += '<div class="card-body">';
          domString += `${obj.name} x 1`;
          domString += '</div>';
          domString += '</div>';
        }
      });
    });
    utils.printToDom('ingredient-reporting-section', domString);
  }).catch((err) => reject(err));
});

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};


export default {
  ingredientReportEvents,
  // buildIngredientReportingPage,
};
