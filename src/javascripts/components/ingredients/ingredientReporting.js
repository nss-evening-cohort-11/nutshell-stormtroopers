import moment from 'moment';
// import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';


const getIngredientsReport = () => new Promise((resolve, reject) => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const modifiedDate1 = moment(date1, 'YYYY/MM/DD').format('YYYY/MM/DD');
  const modifiedDate2 = moment(date2, 'YYYY/MM/DD').format('YYYY/MM/DD');
  // const domString = '';
  smash.getIngredientsForDateRange(modifiedDate1, modifiedDate2).then((results) => {
    results.forEach((result) => {
      console.error(result, 'result');
      const singleArray = result.flat();
      console.error(singleArray);
      singleArray.forEach
    });
    // utils.printToDom('ingredient-reporting-section', domString);
  }).catch((err) => reject(err));
});

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};


export default {
  ingredientReportEvents,
  // buildIngredientReportingPage,
};
