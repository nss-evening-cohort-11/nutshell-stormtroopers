import utils from '../../helpers/utils';

const buildIngredientsSection = () => {
  const domString = '<h2>Ingredients</h2>';
  utils.printToDom('ingredients-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section-container').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').removeClass('hide');
};

export default { buildIngredientsSection };
