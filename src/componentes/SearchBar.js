import React, { useContext, useState } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function SearchBar() {
  const { setReturnAPI, mealOrDrink } = useContext(RecipeAppContext);

  const [searchInput, setSearchInput] = useState(''); // input de busca (atualiza conforme digita)
  const [radioSelected, setRadioSelected] = useState(''); // usado para verificar em qual radio está clicado (atualiza conforme clica no radio)

  const getAPIs = async (endpoint) => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  };

  const chooseURL = () => { // função para escolher qual url utilizar na API, de acordo com qual radioButton foi escolhido e se for meal ou cocktail(info vinda do Footer)
    if (radioSelected === 'ingredientRadio') {
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`); // essa API em específico não realiza o fetch caso o searchInput não esteja em seu banco de dados
    } if (radioSelected === 'nameRadio') {
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    } if (radioSelected === 'firstLetterRadio') {
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
  };

  const handleSearchButton = async () => { // função que, ao clicar no botão de busca, altera o estado "returnAPI" para o que a API do radio button selecionado retorna
    try {
      setReturnAPI(await getAPIs(chooseURL()));
    } catch (error) {
      if (radioSelected === 'ingredientRadio' && mealOrDrink === 'drink') { // tive que fazer um try catch pois a API com essas especificações do if não realiza o fetch caso a palavra não seja exatamente igual a alguma do seu banco de dados
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    const api = await getAPIs(chooseURL());

    if (api[`${mealOrDrink}s`] === null) { // caso não tenha nenhum drink ou meal
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
          value={ searchInput }
          onChange={ ({ target }) => setSearchInput(target.value) } // vai alterando o estado "searchInput" conforme o usuário vai escrevendo neste input
        />
      </label>

      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          name="radios"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredientRadio"
          onClick={ ({ target }) => setRadioSelected(target.value) } // caso seja selecionado, altera o estado "radioSelected" para a string que está salva no value
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          name="radios"
          id="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          value="nameRadio"
          onClick={ ({ target }) => setRadioSelected(target.value) } // caso seja selecionado, altera o estado "radioSelected" para a string que está salva no value
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          name="radios"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          value="firstLetterRadio"
          onClick={ ({ target }) => setRadioSelected(target.value) } // caso seja selecionado, altera o estado "radioSelected" para a string que está salva no value
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchButton() }
      >
        Buscar
      </button>

    </div>
  );
}

export default (SearchBar);
