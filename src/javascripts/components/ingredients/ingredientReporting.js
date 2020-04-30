import moment from 'moment';
import utils from '../../helpers/utils';
import smash from '../../helpers/data/smashData';

const getIngredientsReport = () => new Promise((resolve, reject) => {
  // First let's establish some variables / Ugliness is next to godliness
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const modifiedDate1 = moment(date1).format('YYYY/MM/DD');
  const modifiedDate2 = moment(date2).format('YYYY/MM/DD');
  const names = [];
  const flatNames = [];
  const counts = {};
  let domString = '';
  // Now lets get our Ingredients for the date range
  smash.getIngredientsForDateRange(modifiedDate1, modifiedDate2).then((results) => {
    // Now let's iterate through the results of the function, flatten each array, push the ingredient names
    // into a new array of objects called [names], which we will then flatten into a regular array [newNames]
    // then we will flatten that array yet again and push into [flatNames]
    results.forEach((result) => {
      const singleArray = result.flat();
      singleArray.forEach((obj) => { if (obj) names.push(obj.name); });
      const newNames = Object.keys(names).map((key) => [names[key]]);
      const newFlatNames = newNames.flat();
      flatNames.push(newFlatNames);
    });
    // Now we have to flatten AGAIN and store them an array called [bigFlatNames]
    // then we count all the similar names and store them in an object with the name as the key and its count as the value
    const bigFlatNames = flatNames.flat();
    bigFlatNames.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    // Now we have to iterate through the object we just created and display the ingredient name along with its count
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
    // print the cards to the DOM!
    utils.printToDom('ingredient-reporting-section', domString);
  }).catch((err) => reject(err));
});

const ingredientReportEvents = () => {
  $('body').on('click', '#ingredient-reporting-button', getIngredientsReport);
};

export default { ingredientReportEvents };
