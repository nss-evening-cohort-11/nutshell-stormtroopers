import utils from '../../helpers/utils';

const buildMenuSection = () => {
  const domString = '<h2>Menu</h2>';
  utils.printToDom('menu-section', domString);
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').removeClass('hide');
    $('#ingredients-section').addClass('hide');
  });
};

export default { buildMenuSection };
