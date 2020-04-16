// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
import './menu.scss';
import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const menuBuilder = () => {
  menuData.getMenuItems()
    .then((menuArray) => {
      let domString = '';
      domString += '<h2 class="text-center" style="font-family: Allura">Menu</h2>';
      domString += '<div class="row wrap">';
      menuArray.forEach((item) => {
        domString += '<div class="col-3">';
        domString += '<div id="whole-card-container">';
        domString += `  <div class="card menu-item-card" id="${item.id}">`;
        domString += `    <h5 class="card-header">${item.name}</h5>`;
        domString += '    <div class="card-body">';
        domString += `      <div class="img-holder"><img src="${item.imageUrl}" style="width: 100%"></div>`;
        domString += `      <div class="desc-holder"><p class="card-text">${item.description}</p></div>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('menu-section', domString);
    })
    .catch((err) => console.error('problem with menuBuilder', err));
};

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').removeClass('hide');
  $('#ingredients-section').addClass('hide');
  menuBuilder();
};

export default { buildMenuSection, menuBuilder };
