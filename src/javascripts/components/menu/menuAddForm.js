import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const closeMenuModal = () => {
  $('#add-menu-item-modal').modal('hide');
};

const menuModalBuilder = () => {
  $('#add-menu-item-modal').modal('show');
  let domString = '';
  domString += '<form class="col-12">';
  domString += '  <div class="form-group>';
  domString += '    <label for="input-item-name">Name:</label>';
  domString += '      <input class="form-control input-item-name" id="input-item-name" type="text" placeholder="French Toast">';
  domString += '    <br><label for="input-item-desc">Description:</label>';
  domString += '      <input class="form-control input-item-desc" id="input-item-desc" type="text" placeholder="thick-sliced french bread, cage-free eggs, powdered sugar">';
  domString += '    <br><label for="input-item-category">Category:</label>';
  domString += '      <input class="form-control input-item-category" id="input-item-category" type="text" placeholder="appetizer, main, etc.">';
  domString += '    <br><label for="input-item-genre">Genre:</label>';
  domString += '      <input class="form-control input-item-genre" id="input-item-genre" type="text" placeholder="asian, french, etc.">';
  domString += '    <br><label for="input-item-price">Price:</label>';
  domString += '      <input class="form-control input-item-price" id="input-item-price" type="text" placeholder="(USD)">';
  domString += '    <br><label for="input-item-image">Image URL:</label>';
  domString += '      <input class="form-control input-item-image" id="input-item-image" type="text" placeholder="www.imgur.com/">';
  domString += '    <br><p class="text-center">Save your item, then add ingredients</p>';
  domString += '    <button class="col-12 btn btn-secondary" id="submit-new-item">Save</button>';
  domString += '  </div>';
  domString += '</form>';
  utils.printToDom('add-menu-item-modal-body', domString);
  $('body').on('click', '#close-menu-modal', closeMenuModal);
  $('body').on('click', '#submit-new-item', menuData.addNewItem);
};

export default { menuModalBuilder };
