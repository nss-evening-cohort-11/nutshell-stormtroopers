// import axios from 'axios';
// import apiKeys from '../../helpers/apiKeys.json';
// import utils from '../../helpers/utils';
import menuData from '../../helpers/data/menuData';

const menuBuilder = () => {
  menuData.getMenuItems();
};

export default { menuBuilder };
