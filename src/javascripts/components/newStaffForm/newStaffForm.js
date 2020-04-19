import utils from '../../helpers/utils';
import jobData from '../../helpers/data/jobData';

const buildNewStaffForm = () => {
  jobData.getAllJobs()
    .then((jobs) => {
      let domString = '';
      domString += '<form class="staff-form text-left d-flex flex-column justify-content-between" id="new-staff-form">';
      domString += '    <div class="form-group staff-form-group">';
      domString += '        <label for="new-staff-member-image">New Staff Member Image</label>';
      domString += '        <input type="text" class="form-control" id="new-staff-member-image" placeholder="Paste new employee image url here...">';
      domString += '    </div>';
      domString += '    <div class="form-group staff-form-group">';
      domString += '        <label for="new-staff-member-name">New Staff Member Name</label>';
      domString += '        <input type="text" class="form-control" id="new-staff-member-name" placeholder="Enter new employee name...">';
      domString += '    </div>';
      jobs.forEach((job, i) => {
        domString += '<div class="custom-control custom-radio staff-form-group staff-radio">';
        domString += `  <input type="radio" id="jobRadio-${i + 1}" name="jobRadio" class="custom-control-input" value="${job.id}">`;
        domString += `  <label class="custom-control-label" for="jobRadio-${i + 1}">${job.jobType}</label>`;
        domString += '</div>';
      });
      domString += '  <button type="button" id="submit-new-member-button" class="m-3 btn btn-outline-dark">Save</button>';
      domString += '</form>';
      utils.printToDom('modal-header', 'Add A New Staff Member');
      utils.printToDom('staff-modal-body', domString);
      $(document).ready(() => {
        $('#staff-modal').modal('show');
      });
    })
    .catch((err) => console.error('There is a problem in the new staff form:', err));
};

export default { buildNewStaffForm };
