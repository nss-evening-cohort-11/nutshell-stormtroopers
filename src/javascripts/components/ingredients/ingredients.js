import ingredientsData from '../../helpers/data/ingredientsData';
import utils from '../../helpers/utils';

const buildIngredientsSection = () => {
  ingredientsData.getIngredients()
    .then((response) => {
      const ingredients = response;
      let domString = '<h2>Ingredients</h2>';
      domString += '<div class="d-flex flex-wrap p-3 justify-content-around">';
      ingredients.forEach((ingredient) => {
        const Name = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
        domString += '<div class="card mb-3" style="max-width: 800px;">';
        domString += '<div class="row no-gutters">';
        domString += '<div class="col-md-4">';
        domString += `<img src="${ingredient.imageUrl}" class="card-img" alt="...">`;
        domString += '</div>';
        domString += '<div class="col-md-4">';
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title">${Name}</h5>`;
        domString += `<p class="card-text">Cost: ${ingredient.cost}</p>`;
        domString += `<p class="card-text">Type: ${ingredient.type}</p>`;
        domString += `<p class="card-text">Size: ${ingredient.size}</p>`;
        domString += `<p class="card-text"><small class="text-muted">Units: ${ingredient.unit}</small></p>`;
        domString += '</div>';
        domString += '</div>';
        domString += '<div class="col-md-4">';
        domString += '<div class="d-flex card-body align-content-center">';
        domString += `<p class="card-text">Quantity: ${ingredient.quantity}</p>`;
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
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
