import '../styles/main.scss';
import 'bootstrap';

import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import menu from './components/menu/menu';
import ingredients from './components/ingredients/ingredients';

const navbarClickEvents = () => {
  $('#staff-button').click(() => staff.buildStaffSection);
  $('#reservations-button').click(reservations.buildReservationsSection);
  $('#menu-button').click(menu.buildMenuSection);
  $('#ingredients-button').click(ingredients.buildIngredientsSection);
};

const init = () => {
  navbarClickEvents();
};

init();
