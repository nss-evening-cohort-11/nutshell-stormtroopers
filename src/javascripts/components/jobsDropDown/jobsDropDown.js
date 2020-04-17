const jobsDropDown = (jobs) => {
  let domString = '';
  domString += '<div class="dropdown">';
  domString += '    <button class="btn btn-outline-dark dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter Staff by Job</button>';
  domString += '    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">';
  jobs.forEach((job) => {
    domString += `      <button id="${job.id}" class="job-button btn-outline-dark dropdown-item" type="button">${job.jobType}</button>`;
  });
  domString += '        <div class="dropdown-divider"></div>';
  domString += '        <button id="all-jobs-button" class="job-button dropdown-item">All Jobs</button>';
  domString += '    </div>';
  domString += '</div>';
  return domString;
};

export default { jobsDropDown };
