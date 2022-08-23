import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [returnAPI, setReturnAPI] = useState(''); // nos dá o retorno da API (atualiza conforme o botão de busca (do componente SearchBar) é clicado)
  const [mealOrDrink, setmealOrDrink] = useState('meal'); // info de ser meal ou cocktail deverá vir do Footer e será encaminhada para o SearchBar
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const contextValue = {
    returnAPI,
    setReturnAPI,
    mealOrDrink,
    setmealOrDrink,
    searchBarVisible,
    setSearchBarVisible,
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
