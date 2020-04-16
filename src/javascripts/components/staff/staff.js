import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import staffMemberComponent from '../staffMember/staffMember';

import './staff.scss';

const buildStaffSection = () => {
  staffData.getAllStaffMembers()
    .then((staff) => {
      console.error(staff);
      let domString = '';
      domString += '  <h1 class="text-center display-4">Staff</h1>';
      domString += '  <div class="d-flex justify-content-center align-items-center">';
      domString += '    <button class="btn btn-outline-dark staff-button">Add New Staff</button>';
      domString += '    <button class="btn btn-outline-dark staff-button">View All Staff</button>';
      domString += '    <button class="btn btn-outline-dark staff-button">Filter Staff</button>';
      domString += '  </div>';
      domString += '  <div id="staff-card-container" class="p-5 d-flex flex-wrap justify-content-center align-items-center">';
      staff.forEach((staffMember) => {
        domString += staffMemberComponent.buildSingleStaffMemberCard(staffMember);
      });
      domString += '  </div>';
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
