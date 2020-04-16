import '../styles/main.scss';
import 'bootstrap';
import menuComponent from './components/menu/menu';
import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import ingredients from './components/ingredients/ingredients';

const navbarClickEvents = () => {
  $('#staff-button').click(() => staff.buildStaffSection);
  $('#reservations-button').click(reservations.buildReservationsSection);
  $('#menu-button').click(menuComponent.buildMenuSection);
  $('#ingredients-button').click(ingredients.buildIngredientsSection);
};

const init = () => {
  menuComponent.menuBuilder();
  navbarClickEvents();
};

init();
