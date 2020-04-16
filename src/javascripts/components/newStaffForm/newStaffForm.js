import utils from '../../helpers/utils';

const buildNewStaffForm = () => {
  let domString = '';
  domString += '<form id="new-staff-form">';
  domString += '    <div class="form-group">';
  domString += '        <label for="-new-staff-member-name">New Staff Member Name</label>';
  domString += '        <input type="text" class="form-control" id="new-staff-member-name" placeholder="Enter new employee name...">';
  domString += '    </div>';
  // Need a collection of all possible jobs to loop through and create radio buttons.
  domString += '</form>';
  utils.printToDom('add-board-view', domString);
  $('#new-staff-member-modal').modal('show');
};

export default { buildNewStaffForm };
