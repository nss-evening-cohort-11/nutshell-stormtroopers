import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobData from '../../helpers/data/jobData';
import singleStaffMemberCard from '../singleStaffMemberCard/singleStaffMemberCard';
import jobsDropDownComponent from '../jobsDropDown/jobsDropDown';
import newStaffForm from '../newStaffForm/newStaffForm';
import editStaffForm from '../editStaffForm/editStaffForm';

import './staff.scss';

const viewStaffModal = (e) => {
  const selectedStaffId = e.target.closest('.staff-card').id;
  editStaffForm.buildEditStaffForm(selectedStaffId);
};

const deleteStaffMember = (e) => {
  e.preventDefault();
  const selectedStaffId = e.target.dataset.staffId;
  staffData.removeStaffMember(selectedStaffId)
    .then(() => {
      $(document).ready(() => {
        $('#edit-staff-form').trigger('reset');
        $('#staff-modal').modal('hide');
      });
      utils.printToDom('staff-modal-body', '');
      // eslint-disable-next-line no-use-before-define
      staffInit();
    })
    .catch((err) => console.error('There is a problem with deleting:', err));
};

const modifyStaffMember = (e) => {
  e.preventDefault();
  const selectedStaffId = e.target.dataset.staffId;
  const modifiedImage = $('#edit-staff-member-image').val();
  const modifiedName = $('#edit-staff-member-name').val();
  const modifiedJobId = $("input[name='editJobRadio']:checked").val();
  const blankCheck = [modifiedImage, modifiedName, modifiedJobId].some((input) => /^\s*$/.test(input));
  if (!blankCheck) {
    const modifiedStaffMember = {
      imageUrl: modifiedImage,
      name: modifiedName,
      jobId: modifiedJobId,
      uid: '1234567',
    };
    staffData.updateStaffMember(selectedStaffId, modifiedStaffMember)
      .then(() => {
        $(document).ready(() => {
          $('#edit-staff-form').trigger('reset');
          $('#staff-modal').modal('hide');
        });
        utils.printToDom('staff-modal-body', '');
        // eslint-disable-next-line no-use-before-define
        staffInit();
      })
      .catch((err) => console.error('There is a problem with modifying:', err));
  }
};

const closeStaffModal = () => {
  utils.printToDom('staff-modal-body', '');
  $('#staff-modal').modal('hide');
};

const addStaffMember = () => {
  const newImage = $('#new-staff-member-image').val();
  const newName = $('#new-staff-member-name').val();
  const newJobId = $("input[name='jobRadio']:checked").val();
  const blankCheck = [newImage, newName, newJobId].some((input) => /^\s*$/.test(input));
  if (!blankCheck) {
    const newStaffMember = {
      imageUrl: newImage,
      name: newName,
      jobId: newJobId,
      uid: '1234567',
    };
    staffData.setStaffMember(newStaffMember)
      .then(() => {
        $(document).ready(() => {
          $('#new-staff-form').trigger('reset');
          $('#staff-modal').modal('hide');
        });
        utils.printToDom('staff-modal-body', '');
        // eslint-disable-next-line no-use-before-define
        staffInit();
      })
      .catch((err) => console.error('There is a problem with adding:', err));
  }
};

// const buildStaffCardContainer = (staffArr, jobsArr) => {
//   jobData.getAllJobs().then((jobs) => {}).catch((err) => console.error('Try again', err));
//   let staffCardDomString = '';
//   staffArr.forEach((staffMember) => {
//     const thisEmployeeJob = jobsArr.find((x) => staffMember.jobId === x.id);
//     staffCardDomString += singleStaffMemberCard.buildSingleStaffMemberCard(staffMember, thisEmployeeJob);
//   });
//   utils.printToDom('staff-card-container', staffCardDomString);
// };

const buildStaffSection = (staffArr) => {
  jobData.getAllJobs().then((jobs) => {
    let domString = '';
    let staffCardDomString = '';
    domString += '<h1 id="staff-page-header" class="col-12 text-center display-4">Staff</h1>';
    domString += '<div class="col-12 d-flex justify-content-center align-items-center">';
    domString += '  <a role="button" id="add-staff-button" class="btn btn-outline-dark staff-button">Add New Staff</a>';
    domString += jobsDropDownComponent.jobsDropDown(jobs);
    domString += '</div>';
    domString += '<div id="staff-card-container" class="col-12 container-fluid p-5 d-flex flex-wrap justify-content-center align-items-center"></div>';
    utils.printToDom('staff-section', domString);
    staffArr.forEach((staffMember) => {
      const thisEmployeeJob = jobs.find((x) => staffMember.jobId === x.id);
      staffCardDomString += singleStaffMemberCard.buildSingleStaffMemberCard(staffMember, thisEmployeeJob);
    });
    utils.printToDom('staff-card-container', staffCardDomString);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        $(document).ready(() => {
          $('#add-staff-button').removeClass('disabled');
          $('#add-staff-button').click(newStaffForm.buildNewStaffForm);
        });
      } else {
        $(document).ready(() => {
          $('#add-staff-button').addClass('disabled');
        });
      }
    });
  }).catch((err) => console.error('There is a problem with building the staff section', err));
};


const staffInit = () => {
  $(document).ready(() => {
    // eslint-disable-next-line no-use-before-define
    $('body').on('click', '.job-button', jobFilterEvent);
    $('#home-page').addClass('hide');
    $('#staff-section-container').removeClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
  });
  staffData.getAllStaffMembers()
    .then((staff) => {
      buildStaffSection(staff);
    })
    .catch((err) => console.error('There is a problem with reading the staff members:', err));
};

const jobFilterEvent = (e) => {
  const buttonId = e.target.id;
  if (buttonId === 'all-jobs-button') {
    utils.printToDom('staff-card-container', '');
    staffInit();
  } else {
    staffData.getStaffByJobId(buttonId)
      .then((selectedStaff) => {
        utils.printToDom('staff-card-container', '');
        buildStaffSection(selectedStaff);
      })
      .catch((err) => console.error('There is a problem with filtering:', err));
  }
};

const staffSectionEvents = () => {
  $(document).ready(() => {
    $('body').on('click', '#submit-new-member-button', addStaffMember);
    $('body').on('click', '#delete-member-button', deleteStaffMember);
    $('body').on('click', '#edit-member-button', modifyStaffMember);
    $('body').on('click', '.staff-card', viewStaffModal);
    $('#close-modal').click(closeStaffModal);
  });
};

const removeStaffSectionEvents = () => {
  $(document).ready(() => {
    $('body').off('click', '#submit-new-member-button', addStaffMember);
    $('body').off('click', '#delete-member-button', deleteStaffMember);
    $('body').off('click', '#edit-member-button', modifyStaffMember);
    $('body').off('click', '.staff-card', viewStaffModal);
  });
};


export default {
  staffInit,
  staffSectionEvents,
  addStaffMember,
  removeStaffSectionEvents,
};
