import './singleStaffMemberCard.scss';

const buildSingleStaffMemberCard = (staffMember, thisEmployeeJob) => {
  let domString = '';
  domString += '<div class="col-sm-12 col-md-12 col-lg-4 col-xl-6 staff-card-divider">';
  domString += `    <div id="${staffMember.id}" data-job-id="${staffMember.jobId}" class="p-3 staff-card text-center card">`;
  domString += `        <div class="img-container"><img class="m-3 mx-auto d-block staff-image image-fluid" src="${staffMember.imageUrl}" alt="${staffMember.name}"/></div>`;
  domString += '        <div class="staff-card-body card-body">';
  domString += `            <h2 class="card-title">${staffMember.name}</h2>`;
  domString += `            <p class="card-text">${thisEmployeeJob.jobType}</p>`;
  domString += '        </div>';
  domString += '    </div>';
  domString += '</div>';
  return domString;
};

export default { buildSingleStaffMemberCard };
