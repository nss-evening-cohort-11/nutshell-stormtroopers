import moment from 'moment';

const getDateArray = (start, end) => {
  const dateArray = [];
  const date = new Date(start);
  while (date <= end) {
    dateArray.push(moment(date).format('YYYY-MM-DD'));
    date.setDate(date.getDate() + 1);
  }
  dateArray.forEach((x) => moment(x).format('YYYY-MM-DD'));
  return dateArray;
};

const getDatesForAWeek = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return getDateArray(start, end);
};

export default { getDatesForAWeek };
