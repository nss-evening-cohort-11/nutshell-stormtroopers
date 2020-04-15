import utils from '../../helpers/utils';

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
};

export default { buildMenuSection };
