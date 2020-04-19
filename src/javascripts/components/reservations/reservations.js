import utils from '../../helpers/utils';

const buildReservationsSection = () => {
  const domString = '<h2>Reservations</h2>';
  utils.printToDom('reservations-section', domString);
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').removeClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
  });
};

export default { buildReservationsSection };
