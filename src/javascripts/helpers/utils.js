const printToDom = (divId, domString) => {
  $(document).ready(() => {
    $(`#${divId}`).html(domString);
  });
};

export default { printToDom };
