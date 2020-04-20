import util from '../../helpers/utils';
import ingredientsData from '../../helpers/data/ingredientsData';

const showEditIngredientModal = (ingredientId) => {
  ingredientsData.getSingleIngredient(ingredientId)
    .then((response) => {
      const ingredient = response.data;
      let domString = '<h3>Add a new Ingredient</h3>';
      domString += `<form id="${ingredientId}" class="edit-form-id">`;
      domString += '<div class="form-group">';
      domString += '<label for="name-input">Name:</label>';
      domString += `<input type="text" class="form-control" id="name-input" value="${ingredient.name}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="imageUrl-input">ImageUrl:</label>';
      domString += `<input type="text" class="form-control" id="imageUrl-input" value="${ingredient.imageUrl}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="type-input">Type:</label>';
      domString += `<input type="text" class="form-control" id="type-input" value="${ingredient.type}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="quantity-input">Quantity:</label>';
      domString += `<input type="text" class="form-control" id="quantity-input" value="${ingredient.quantity}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="unit-size-input">Unit-size:</label>';
      domString += `<input type="text" class="form-control" id="unit-size-input" value="${ingredient.size}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="unit-type-input">Unit-type:</label>';
      domString += `<input type="text" class="form-control" id="unit-type-input" value="${ingredient.unit}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="unit-price-input">Unit-price:</label>';
      domString += `<input type="text" class="form-control" id="unit-price-input" value="${ingredient.cost}">`;
      domString += '</div>';
      domString += '</form>';
      util.printToDom('add-ingredient-body', domString);
      domString = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
      domString += '<button id="edit-ingredient-save-btn" type="button" class="btn btn-dark" data-dismiss="modal">Save</button>';
      $('#add-ingredient-footer').html(domString);
    })
    .catch((err) => console.error(err));
};

export default { showEditIngredientModal };
