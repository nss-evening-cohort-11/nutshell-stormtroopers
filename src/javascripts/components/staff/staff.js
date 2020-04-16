import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';

const buildStaffSection = () => {
  staffData.getAllStaffMembers()
    .then((staff) => {
      console.error(staff);
      let domString = '';
      domString += '<div>';
      domString += '</div>';
      utils.printToDom('staff-section', domString);
      $('#home-page').addClass('hide');
      $('#staff-section').removeClass('hide');
      $('#reservations-section').addClass('hide');
      $('#menu-section').addClass('hide');
      $('#ingredients-section').addClass('hide');
    })
    .catch((err) => console.error('Problem getting the staff members', err));
};

export default { buildStaffSection };
