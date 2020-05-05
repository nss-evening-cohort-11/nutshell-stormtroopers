import Moment from 'moment';
import utils from './utils';

const resetFormValues = () => {
  $('#date1').val('');
  $('#date2').val('');
  $('#date3').val('');
};

const showIngredientsTab = () => {
  $('#most-ordered-section').addClass('hide');
  $('#least-ordered-section').addClass('hide');
  $('#revenue-reporting-section').addClass('hide');
  $('#ingredient-reporting-section').removeClass('hide');
};

const clearIngredientChart = () => {
  $('ingredient-chart').empty();
};

const ingredientDivBuilder = (startDate, endDate) => {
  let domString = '';
  domString += '<h4 class="col-12" style="text-align: center;">Inventory Used ';
  domString += `${startDate === endDate ? `on ${startDate}` : `from ${startDate} to ${endDate}`}</h4>`; // title change based on a single date or a range
  domString += '<div id="ingredient-chart"></div>';
  utils.printToDom('ingredient-reporting-section', domString);
};

const dateCheck = () => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const date3 = $('#date3').val();
  let modifiedDate1 = '';
  let modifiedDate2 = '';
  if (date3 === '') {
    modifiedDate1 = Moment(date1).format('YYYY/MM/DD');
    modifiedDate2 = Moment(date2).format('YYYY/MM/DD');
  } else {
    modifiedDate1 = Moment(date3).format('YYYY/MM/DD');
    modifiedDate2 = Moment(date3).format('YYYY/MM/DD');
  }
  return [modifiedDate1, modifiedDate2];
};

export default {
  resetFormValues,
  showIngredientsTab,
  ingredientDivBuilder,
  dateCheck,
  clearIngredientChart,
};
