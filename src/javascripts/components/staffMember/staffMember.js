import './staffMember.scss';

const buildSingleStaffMemberCard = (staffMember) => {
  let domString = '';
  domString += '<div class="col-4 staff-card-divider">';
  domString += `    <div id="${staffMember.id}" class="p-3 d-flex flex-column justify-content-center staff-card text-center card">`;
  domString += `        <img class="m-3 rounded mx-auto d-block staff-image image-fluid" src="${staffMember.imageUrl}" alt="${staffMember.name}"/>`;
  domString += '        <div class="card-body">';
  domString += `            <h5 class="card-title">${staffMember.name}</h5>`;
  domString += `            <p class="card-text">${staffMember.jobType.charAt(0).toUpperCase() + staffMember.jobType.slice(1)}</p>`;
  domString += '        </div>';
  domString += '    </div>';
  domString += '</div>';
  return domString;
};

export default { buildSingleStaffMemberCard };
