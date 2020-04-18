/* eslint-disable no-use-before-define */
// import firebase from 'firebase/app';

import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobData from '../../helpers/data/jobData';
import staffMemberComponent from '../staffMember/staffMember';
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
      $('#edit-staff-form').trigger('reset');
      $('#add-staff-modal').modal('hide');
      utils.printToDom('add-staff-modal-body', '');
      staffInit();
    })
    .catch((err) => console.error('This shit ain\'t workin\', yo', err));
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
    console.error(modifiedStaffMember);
    staffData.updateStaffMember(selectedStaffId, modifiedStaffMember)
      .then(() => {
        staffInit();
      })
      .catch((err) => console.error('You fucked up.', err));
  }
};

const closeStaffModal = () => {
  utils.printToDom('add-staff-modal-body', '');
  $('#add-staff-modal').modal('hide');
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
        $('#new-staff-form').trigger('reset');
        $('#add-staff-modal').modal('hide');
        utils.printToDom('add-staff-modal-body', '');
        staffInit();
      })
      .catch((err) => console.error('Could not add a new member', err));
  }
};

const buildStaffSection = (staffArr) => {
  jobData.getAllJobs().then((jobs) => {
    let domString = '';
    let staffCardDomString = '';
    domString += '<h1 class="col-12 text-center display-4">Staff</h1>';
    domString += '<div class="col-12 d-flex justify-content-center align-items-center">';
    domString += '  <button id="add-staff-button" class="btn btn-outline-dark staff-button">Add New Staff</button>';
    domString += jobsDropDownComponent.jobsDropDown(jobs);
    domString += '</div>';
    domString += '<div id="staff-card-container" class="col-12 container-fluid p-5 d-flex flex-wrap justify-content-center align-items-center"></div>';
    utils.printToDom('staff-section', domString);
    staffArr.forEach((staffMember) => {
      const thisEmployeeJob = jobs.find((x) => staffMember.jobId === x.id);
      staffCardDomString += staffMemberComponent.buildSingleStaffMemberCard(staffMember, thisEmployeeJob);
    });
    utils.printToDom('staff-card-container', staffCardDomString);
    $('#add-staff-button').click(newStaffForm.buildNewStaffForm);
  });
};

const staffInit = () => {
  $('#home-page').addClass('hide');
  $('#staff-section-container').removeClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
  staffData.getAllStaffMembers()
    .then((staff) => {
      buildStaffSection(staff);
    })
    .catch((err) => console.error('Oops', err));
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
      .catch((err) => console.error('What the fuck.', err));
  }
};


const staffSectionEvents = () => {
  $('body').on('click', '.job-button', jobFilterEvent);
  $('body').on('click', '#submit-new-member-button', addStaffMember);
  $('body').on('click', '#delete-member-button', deleteStaffMember);
  $('body').on('click', '#edit-member-button', modifyStaffMember);
  $('body').on('click', '.staff-card', viewStaffModal);
  $('#close-add-modal').click(closeStaffModal);
};


export default { staffInit, staffSectionEvents, addStaffMember };
