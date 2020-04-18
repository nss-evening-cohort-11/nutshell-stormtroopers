import './singleStaffMemberCard.scss';

const buildSingleStaffMemberCard = (staffMember, thisEmployeeJob) => {
  let domString = '';
  domString += '<div class="col-6 staff-card-divider">';
  domString += `    <div id="${staffMember.id}" data-job-id="${staffMember.jobId}" class="text-white p-3 staff-card text-center card border-dark">`;
  domString += `        <img class="m-3 rounded mx-auto d-block staff-image image-fluid" src="${staffMember.imageUrl}" alt="${staffMember.name}"/>`;
  domString += '        <div class="card-body">';
  domString += `            <h5 class="card-title">${staffMember.name}</h5>`;
  domString += `            <p class="card-text">${thisEmployeeJob.jobType}</p>`;
  domString += '        </div>';
  domString += '    </div>';
  domString += '</div>';
  return domString;
};

export default { buildSingleStaffMemberCard };
