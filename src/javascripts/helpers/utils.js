const printToDom = (divId, domString) => {
  $(`#${divId}`).html(domString);
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

export default { printToDom, getCheckboxVal };
