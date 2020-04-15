import utils from '../../helpers/utils';

const buildIngredientsSection = () => {
  const domString = '<h2>Ingredients</h2>';
  utils.printToDom('ingredients-section', domString);
};

export default { buildIngredientsSection };
