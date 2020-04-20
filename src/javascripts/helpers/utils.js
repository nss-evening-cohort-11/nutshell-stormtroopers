const printToDom = (divId, domString) => {
  $(document).ready(() => {
    $(`#${divId}`).html(domString);
  });
};

const getCheckboxVal = () => {
  const checkedItems = [];
  Array.from($('.add-ingred-checks')).forEach((item) => {
    if (item.checked) {
      checkedItems.push(item.id);
    }
  });
  return checkedItems;
};

const getRadioVal = () => {
  let val;
  Array.from($('.filter-ingred-radios')).forEach((item) => {
    if (item.checked) {
      val = item.id;
    }
  });
  return val;
};

export default { printToDom, getCheckboxVal, getRadioVal };
