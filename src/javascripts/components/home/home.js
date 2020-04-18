const showHomePage = () => {
  $('#home-page').removeClass('hide');
  $('#staff-section-container').addClass('hide');
  $('#reservations-section').addClass('hide');
  $('#menu-section').addClass('hide');
  $('#ingredients-section').addClass('hide');
};

export default { showHomePage };
