const printToDom = (divId, domString) => {
  $(`#${divId}`).html(domString);
};

export default { printToDom };
