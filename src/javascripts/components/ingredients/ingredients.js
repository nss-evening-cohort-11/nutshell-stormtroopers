import ingredientsData from '../../helpers/data/ingredientsData';
import utils from '../../helpers/utils';

const buildIngredientsSection = () => {
  ingredientsData.getIngredients()
    .then((response) => {
      const ingredients = response;
      let domString = '<h2>Ingredients</h2>';
      ingredients.forEach((ingredient) => {
        domString += '<div class="card">';
        domString += `<p>${ingredient.name}</p>`;
        domString += `<img class="ingredient-image" src="${ingredient.imageUrl}">`;
        domString += `<p>${ingredient.type}</p>`;
        domString += `<p>${ingredient.cost}</p>`;
        domString += `<p>${ingredient.quantity}</p>`;
        domString += `<p>${ingredient.size}</p>`;
        domString += `<p>${ingredient.unit}</p>`;
        domString += '</div>';
      });
      utils.printToDom('ingredients-section', domString);
    })
    .catch((err) => console.error('Could not get ingredients', err));
  $('#home-page').addClass('hide');
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').removeClass('hide');
};

export default { buildIngredientsSection };
