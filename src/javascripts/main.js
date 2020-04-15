import '../styles/main.scss';
import 'bootstrap';

import staff from './components/staff/staff';
import reservations from './components/reservations/reservations';
import menu from './components/menu/menu';
import ingredients from './components/ingredients/ingredients';

const init = () => {
  staff.buildStaffSection();
  reservations.buildReservationsSection();
  menu.buildMenuSection();
  ingredients.buildIngredientsSection();
};

init();
