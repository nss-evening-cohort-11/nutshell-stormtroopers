import utils from '../../helpers/utils';
import './reservationsPortal.scss';

const buildReservationsPortalSection = () => {
  let domString = '<h1 id="reservations-portal-header" class="reservations-portal-title text-center">Reservations Portal</h1>';
  domString += '<div class="col-12 text-center"><input type="date" id="reservation-date-selector" class="mx-1" value="2020-04-21"><button type="submit" id="filter-date-btn" class="btn btn-secondary mx-1">Select Date</button></div>';
  domString += '<div id="filtered-reservations-container"></div>';
  utils.printToDom('reservations-portal-section', domString);
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#reservations-portal-section').removeClass('hide');
  });
};

export default { buildReservationsPortalSection };
