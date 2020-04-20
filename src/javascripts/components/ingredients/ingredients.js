import ingredientsData from '../../helpers/data/ingredientsData';
import editIngredientComponent from '../editIngredient/editIngredient';
import utils from '../../helpers/utils';
import './ingredients.scss';

const modifyIngredient = (e) => {
  e.preventDefault();
  const ingredientId = $('.edit-form-id')[0].id;
  const modifiedIngredient = {
    name: $('#name-input').val(),
    type: $('#type-input').val(),
    cost: $('#unit-price-input').val(),
    imageUrl: $('#imageUrl-input').val(),
    quantity: $('#quantity-input').val() * 1,
    size: $('#unit-size-input').val(),
    unit: $('#unit-type-input').val(),
    uid: '',
  };
  ingredientsData.updateIngredient(ingredientId, modifiedIngredient)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildIngredientsSection();
      utils.printToDom('ingredients-section', '');
    })
    .catch((err) => console.error('could not update ingredient', err));
};

const editIngredient = (e) => {
  e.preventDefault();
  const ingredientId = e.target.closest('.card').id;
  editIngredientComponent.showEditIngredientModal(ingredientId);
};

const deleteIngredient = (e) => {
  e.preventDefault();
  const ingredientId = e.target.closest('.card').id;
  ingredientsData.deleteIngredient(ingredientId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildIngredientsSection();
      utils.printToDom('ingredients-section', '');
    })
    .catch((err) => console.error('could not delete ingredient', err));
};

const createNewIngredient = () => {
  const newIngredient = {
    name: $('#name-input').val(),
    type: $('#type-input').val(),
    cost: $('#unit-price-input').val(),
    imageUrl: $('#imageUrl-input').val(),
    quantity: $('#quantity-input').val() * 1,
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
};

const modalEvents = () => {
  $('body').on('click', '#new-ingredient-save-btn', createNewIngredient);
  $('body').on('click', '#edit-ingredient-save-btn', modifyIngredient);
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
  domString = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  domString += '<button id="new-ingredient-save-btn" type="button" class="btn btn-dark" data-dismiss="modal">Save</button>';
  $('#add-ingredient-footer').html(domString);
};

const ingredientEvents = () => {
  $('body').on('click', '#add-ingredient', addIngredient);
  $('body').on('click', '.delete-ingredient', deleteIngredient);
  $('body').on('click', '.edit-ingredient', editIngredient);
};

const buildIngredientsSection = () => {
  ingredientsData.getIngredients()
    .then((response) => {
      const ingredients = response;
      let domString = '<div class="d-flex justify-content-center">';
      domString += '<h2 class="ing-header">Ingredients</h2>';
      domString += '</div>';
      domString += '<div class="d-flex justify-content-center">';
      domString += '<button id="add-ingredient" class="btn btn-dark btn-font hide" data-toggle="modal" data-target="#addIngredientModal">Add Ingredient</button>';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap p-3 justify-content-around">';
      ingredients.forEach((ingredient) => {
        const Name = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
        domString += `<div id="${ingredient.id}" class="card mb-3 col-8 p-0" style="max-width: 800px;">`;
        domString += '<div class="bg-secondary rounded-right">';
        domString += '<div class="d-flex justify-content-between">';
        domString += `<h3 class="card-title m-2">${Name}</h3>`;
        domString += '<div class="row m-1">';
        domString += '<button class="btn btn-dark edit-ingredient hide col-5 m-1" data-toggle="modal" data-target="#addIngredientModal"><i class="fas fa-pencil-alt"></i></button>';
        domString += '<button class="btn btn-danger delete-ingredient hide col-5 m-1"><i class="fas fa-trash"></i></button>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
        domString += '<div class="row no-gutters">';
        domString += '<div class="col-md-4">';
        domString += `<img src="${ingredient.imageUrl}" class="card-img" alt="...">`;
        domString += '</div>';
        domString += '<div class="col-md-4">';
        domString += '<div class="card-body ingredient-card-body">';
        domString += `<p class="card-text">Cost: ${ingredient.cost}</p>`;
        domString += `<p class="card-text">Type: ${ingredient.type}</p>`;
        domString += `<p class="card-text">Size: ${ingredient.size}</p>`;
        domString += `<p class="card-text"><small class="text-muted">Units: ${ingredient.unit}</small></p>`;
        domString += '</div>';
        domString += '</div>';
        domString += '<div class="col-md-4">';
        domString += '<div class="d-flex card-body align-content-center ingredient-card-body">';
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
  $('#staff-section-container').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').removeClass('hide');
};

const loggedOutIngredients = () => {
  $('#add-ingredient').addClass('hide');
  $('.delete-ingredient').addClass('hide');
  $('.edit-ingredient').addClass('hide');
};

const loggedInIngredients = () => {
  $('#add-ingredient').removeClass('hide');
  $('.delete-ingredient').removeClass('hide');
  $('.edit-ingredient').removeClass('hide');
};

export default {
  loggedInIngredients,
  loggedOutIngredients,
  buildIngredientsSection,
  ingredientEvents,
  modalEvents,
};
