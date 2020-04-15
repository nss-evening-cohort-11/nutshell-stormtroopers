import utils from '../../helpers/utils';

const buildStaffSection = () => {
  const domString = '<h2>Staff</h2>';
  utils.printToDom('staff-section', domString);
};

export default { buildStaffSection };
