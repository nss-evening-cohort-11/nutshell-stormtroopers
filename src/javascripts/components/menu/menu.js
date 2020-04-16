// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const menuBuilder = () => {
  menuData.getMenuItems();
};

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').removeClass('hide');
  $('#ingredients-section').addClass('hide');
};

export default { buildMenuSection, menuBuilder };
