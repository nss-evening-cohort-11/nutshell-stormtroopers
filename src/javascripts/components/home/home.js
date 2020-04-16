const showHomePage = () => {
  $('#home-page').removeClass('hide');
  $('#staff-section').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
};

export default { showHomePage };
