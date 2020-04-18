import ingredientsData from '../../helpers/data/ingredientsData';
import utils from '../../helpers/utils';

const createNewIngredient = () => {
  const newIngredient = {
    name: $('#name-input').val(),
    type: $('#type-input').val(),
    cost: $('#unit-price-input').val() * 1,
    imageUrl: $('#imageUrl-input').val(),
    quantity: $('#quantity-input').val(),
    size: $('#unit-size-input').val(),
    unit: $('#unit-type-input').val(),
  };
  ingredientsData.addIngredient(newIngredient)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildIngredientsSection();
      utils.printToDom('ingredients-section', '');
    })
    .catch((err) => console.error('Could not add new ingredient', err));
  console.error('newIngredient', newIngredient);
};

const modalEvents = () => {
  $('#ingredient-save-btn').on('click', createNewIngredient);
};

const addIngredient = () => {
  let domString = '<h3>Add a new Ingredient</h3>';
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="name-input">Name:</label>';
  domString += '<input type="text" class="form-control" id="name-input" placeholder="red onion">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="imageUrl-input">ImageUrl:</label>';
  domString += '<input type="text" class="form-control" id="imageUrl-input" placeholder="www.bitly.com">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="type-input">Type:</label>';
  domString += '<input type="text" class="form-control" id="type-input" placeholder="fruit, vegetable, etc.">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="quantity-input">Quantity:</label>';
  domString += '<input type="text" class="form-control" id="quantity-input" placeholder="whole number">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="unit-size-input">Unit-size:</label>';
  domString += '<input type="text" class="form-control" id="unit-size-input" placeholder="14 oz">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="unit-type-input">Unit-type:</label>';
  domString += '<input type="text" class="form-control" id="unit-type-input" placeholder="can, bottle, package, etc.">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="unit-price-input">Unit-price:</label>';
  domString += '<input type="text" class="form-control" id="unit-price-input" placeholder="$ whole dollar">';
  domString += '</div>';
  domString += '</form>';
  $('#add-ingredient-body').html(domString);
};

const ingredientEvents = () => {
  $('body').on('click', '#add-ingredient', addIngredient);
  $('body').on('click', '#ingredient-save-btn', modalEvents);
};

const buildIngredientsSection = () => {
  ingredientsData.getIngredients()
    .then((response) => {
      const ingredients = response;
      let domString = '<div class="d-flex justify-content-center">';
      domString += '<h2>Ingredients</h2>';
      domString += '</div>';
      domString += '<div class="d-flex justify-content-center">';
      domString += '<button id="add-ingredient" class="btn btn-dark" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>';
      domString += '</div>';
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

export default { buildIngredientsSection, ingredientEvents, modalEvents };
