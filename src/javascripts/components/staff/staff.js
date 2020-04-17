// import firebase from 'firebase/app';

import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import jobData from '../../helpers/data/jobData';
import staffMemberComponent from '../staffMember/staffMember';
import jobsDropDownComponent from '../jobsDropDown/jobsDropDown';
import newStaffForm from '../newStaffForm/newStaffForm';

import './staff.scss';

const addStaffMember = (e) => {
  console.error('This works');
  e.preventDefault();
  const newStaffMember = {
    imageUrl: $('#new-staff-member-image').val(),
    name: $('#new-staff-member-name').val(),
    jobId: $("input[name='jobRadio']:checked").val(),
    uid: '1234567',
  };
  console.error(newStaffMember);
  staffData.setStaffMember(newStaffMember)
    .then(() => {
      $('#new-staff-form').trigger('reset');
      $('#add-staff-modal').modal('hide');
      utils.printToDom('add-staff-modal-body', '');
      // eslint-disable-next-line no-use-before-define
      staffInit();
    })
    .catch((err) => console.error('Could not add a new member', err));
};

const buildStaffSection = (staffArr) => {
  jobData.getAllJobs().then((jobs) => {
    let domString = '';
    domString += '<h1 class="col-12 text-center display-4">Staff</h1>';
    domString += '<div class="col-12 d-flex justify-content-center align-items-center">';
    domString += '  <button id="add-staff-button" class="btn btn-outline-dark staff-button">Add New Staff</button>';
    domString += jobsDropDownComponent.jobsDropDown(jobs);
    domString += '</div>';
    domString += '<div id="staff-card-container" class="col-12 container-fluid p-5 d-flex flex-wrap justify-content-center align-items-center">';
    staffArr.forEach((staffMember) => {
      const thisEmployeeJob = jobs.find((x) => staffMember.jobId === x.id);
      domString += staffMemberComponent.buildSingleStaffMemberCard(staffMember, thisEmployeeJob);
    });
    domString += '</div>';
    utils.printToDom('staff-section', domString);
    // eslint-disable-next-line no-use-before-define
    staffSectionEvents();
  });
};

const staffInit = () => {
  staffData.getAllStaffMembers()
    .then((staff) => {
      buildStaffSection(staff);
    })
    .catch((err) => console.error('Oops', err));
  // eslint-disable-next-line no-use-before-define
};

const jobFilterEvent = (e) => {
  const buttonId = e.target.id;
  if (buttonId === 'all-jobs-button') {
    staffInit();
  } else {
    staffData.getStaffByJobId(buttonId)
      .then((selectedStaff) => {
        buildStaffSection(selectedStaff);
      })
      .catch((err) => console.error('What the fuck.', err));
  }
};


const staffSectionEvents = () => {
  $('#home-page').addClass('hide');
  $('#staff-section').removeClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
  $('body').on('click', '.job-button', jobFilterEvent);
  $('#add-staff-button').click(newStaffForm.buildNewStaffForm);
};


export default { staffInit, staffSectionEvents, addStaffMember };
