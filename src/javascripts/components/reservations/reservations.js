import utils from '../../helpers/utils';

const buildReservationsSection = () => {
  const domString = '<h2>Reservations</h2>';
  utils.printToDom('reservations-section', domString);
};

export default { buildReservationsSection };
