import utils from '../../helpers/utils';

const buildStaffSection = () => {
  const domString = '<h2>Staff</h2>';
  utils.printToDom('staff-section', domString);
  $('#home-page').addClass('hide');
  $('#staff-section').removeClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
};

export default { buildStaffSection };
