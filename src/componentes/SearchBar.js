import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function SearchBar() {
  const doze = 12; // magic numbers

  const { returnAPI, setReturnAPI, mealOrDrink } = useContext(RecipeAppContext);

  const [searchInput, setSearchInput] = useState(''); // input de busca (atualiza conforme digita)
  const [radioSelected, setRadioSelected] = useState(''); // usado para verificar em qual radio está clicado (atualiza conforme clica no radio)

  const getAPIs = async (endpoint) => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
    // return response.ok ? Promise.resolve(json) : Promise.reject(json);
  };

  const chooseURL = () => { // função para escolher qual url utilizar na API, de acordo com qual radioButton foi escolhido e se for meal ou cocktail(info vinda do Footer)
    if (radioSelected === 'ingredientRadio') {
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      if (mealOrDrink === 'drink') return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`); // essa API em específico não realiza o fetch caso o searchInput não esteja em seu banco de dados
    } else if (radioSelected === 'nameRadio') {
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      if (mealOrDrink === 'drink') return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    } else if (radioSelected === 'firstLetterRadio') {
      if (mealOrDrink === 'meal') return (`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      if (mealOrDrink === 'cocktail') return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
    }
  };

  const handleKeyObj = (str) => { // função feita para lidar com o nome da chave do obj retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
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

      {/* <button type="button" data-testid="search-top-btn">stb</button> */ }

      { (returnAPI && returnAPI[`${mealOrDrink}s`] !== null) // caso tenha apenas 1 receita, redirecionar para a pagina de detalhes dela
        && (
          (returnAPI[`${mealOrDrink}s`].length === 1)
          && (
            <Redirect
              to={
                `/recipedetails/${returnAPI[`${mealOrDrink}s`][0][handleKeyObj('id')]}` // Rota provisória
              }
            />
          )
        ) }

      { (returnAPI && returnAPI[`${mealOrDrink}s`] !== null) // caso tenha múltiplas receitas
        && (
          (returnAPI[`${mealOrDrink}s`]).slice(0, doze).map((recipe, i) => (
            <div key={ recipe[handleKeyObj('id')] } data-testid={ `${i}-recipe-card` }>
              <img
                style={ { width: '100px' } } // provisório
                src={ recipe[`${handleKeyObj('str')}Thumb`] }
                alt={ recipe[handleKeyObj('str')] }
              />
              <p data-testid={ `${i}-card-name` }>
                { recipe[handleKeyObj('str')] }
              </p>
            </div>
          ))
        ) }
    </div>
  );
}

export default (SearchBar);
