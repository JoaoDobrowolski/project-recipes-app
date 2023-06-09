import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [returnAPI, setReturnAPI] = React.useState(''); // nos dá o retorno da API (atualiza conforme o botão de busca (do componente SearchBar) é clicado)
  const [mealOrDrink, setMealOrDrink] = useState('meal'); // info de ser meal ou cocktail deverá vir do Footer e será encaminhada para o SearchBar
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  // estado com o id de cada receita
  const [detailsMeal, setDetailsMeal] = useState('');
  const [detailsDrink, setDetailsDrink] = useState('');
  const [category, setCategory] = useState('');
  const [doRedirect, setDoRedirect] = useState(true);

  const contextValue = {
    returnAPI,
    setReturnAPI,
    mealOrDrink,
    setMealOrDrink,
    searchBarVisible,
    setSearchBarVisible,
    detailsMeal,
    setDetailsMeal,
    detailsDrink,
    setDetailsDrink,
    category,
    setCategory,
    doRedirect,
    setDoRedirect,
  };

  return (
    <RecipeAppContext.Provider value={ contextValue }>
      { children }
    </RecipeAppContext.Provider>
  );
}

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeAppProvider;
