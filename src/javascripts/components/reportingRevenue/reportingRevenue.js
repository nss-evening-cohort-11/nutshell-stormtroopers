import moment from 'moment';
import utils from '../../helpers/utils';


const showReportingTab = () => {
  let domString = '';
  domString += '<button id="reporting-button" class="btn btn-white nav-link">Reporting</button>';
  utils.printToDom('reporting-tab', domString);
};

const removeReportingTab = () => {
  const domString = '';
  utils.printToDom('reporting-tab', domString);
};
const getDates = () => {
  const date1 = $('#date1').val();
  const date2 = $('#date2').val();
  const modifiedDate1 = moment(date1, 'YYYY/MM/DD').format('YYYY/MM/DD');
  const modifiedDate2 = moment(date2, 'YYYY/MM/DD').format('YYYY/MM/DD');
  const date = moment('2019/04/10', 'YYYY/MM/DD');

  console.error(date.isBetween(modifiedDate1, modifiedDate2));
};

const buildReportingPage = () => {
  console.error('hi');

  let domString = '';
  domString += '<h1 class="text-center my-3">Reporting</h1>';
  domString += '<div id="date-div" class="wrap text-center">';
  domString += '<form class=" col-3">';
  domString += '<div class="form-group">';
  domString += '<label for="date1">Date Start</label>';
  domString += '<input type="text" class="form-control" id="date1" aria-describedby="firstdate" placeholder="2019-4-26">';
  domString += '</div>';
  domString += '</form>';
  domString += '<form class=" col-3">';
  domString += '<div class="form-group">';
  domString += '<label for="date2">Date End</label>';
  domString += '<input type="text" class="form-control" id="date2" aria-describedby="seconddate" placeholder="2019-4-28">';
  domString += '</div>';
  domString += '</form>';
  domString += '</div>';
  domString += '<div id="statistic-buttons-div" class = "text-center my-3">';
  domString += '<button id="revenue-button" class="btn btn-success">Revenue</button>';
  domString += '</div>';
  domString += '<div id="statistics-container-div">';
  domString += '</div>';
  utils.printToDom('reporting-section', domString);
  $(document).ready(() => {
    $('#home-page').addClass('hide');
    $('#staff-section-container').addClass('hide');
    $('#reservations-section').addClass('hide');
    $('#menu-section').addClass('hide');
    $('#ingredients-section').addClass('hide');
    $('#orders-section').addClass('hide');
    $('#reporting-section').removeClass('hide');
    $('#reservations-portal-section').addClass('hide');
  });
};

const revenueEvents = () => {
  $('body').on('click', '#revenue-button', getDates);
};


export default {
  showReportingTab,
  removeReportingTab,
  buildReportingPage,
  revenueEvents,
};
