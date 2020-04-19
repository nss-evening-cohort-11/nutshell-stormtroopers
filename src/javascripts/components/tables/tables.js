import tableData from '../../helpers/data/tableData';

const tableBuilder = () => {
  tableData.getTables()
    .then((tables) => {
      let domString = '';
      tables.forEach((table) => {
        console.log(table.tableNumber);
        domString += '<div class="card" style="width: 18rem;">';
        domString += '<div class="card-header">';
        domString += `${table.tableNumber}`;
        domString += '</div>';
        domString += `${table.numOfSeats}`;
        domString += '<ul class="list-group list-group-flush">';
        domString += '<li class="list-group-item">Cras justo odio</li>';
        domString += '<li class="list-group-item">Dapibus ac facilisis in</li>';
        domString += '<li class="list-group-item">Vestibulum at eros</li>';
        domString += '</ul>';
        domString += '</div>';
      });
      return domString;
    });
  // .catch((err) => console.error('could not get tables', err));
};

export default { tableBuilder };
