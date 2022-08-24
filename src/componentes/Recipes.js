import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function Recipes() {
  const history = useHistory();

  const doze = 12; // magic numbers

  const {
    returnAPI, mealOrDrink, setId } = useContext(RecipeAppContext);
  console.log(returnAPI);
  // console.log(mealOrDrink.charAt(0).toUpperCase(), mealOrDrink.slice(1));

  const handleKeyObj = (str) => { // função feita para lidar com o nome da chave do obj retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
  };

  const click = (id) => {
    setId(id);
    console.log(mealOrDrink);
    /* const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; */
    if (mealOrDrink === 'meal') {
      history.push(`/foods/${id}`);
      // return json;
      // console.log(json);
    }
    /* const response = await fetch(urlDrinks);
    const json = await response.json();
    setRecipesDetails(json); */
    history.push(`/drinks/${id}`);
    // return json;
    // console.log(json);

    /* setIdRecipe(id);
    console.log(idRecipe);
 */
    /* const infoId = () => {
      if (mealOrDrink === 'meal') {
        return (urlMeals);
      } return (urlDrinks);
    }; */
  };

  return (
    <div>
      { (returnAPI && returnAPI[`${mealOrDrink}s`] !== null) // caso tenha apenas 1 receita, redirecionar para a pagina de detalhes dela
        && (
          (mealOrDrink === 'meal')
            ? (
              (returnAPI.meals.length === 1)
              && (
                <Redirect
                  to={
                    `/foods/${returnAPI[`${mealOrDrink}s`][0][handleKeyObj('id')]}` // Rota provisória
                  }
                />
              )
            )
            : (
              (returnAPI.drinks.length === 1)
              && (
                <Redirect
                  to={
                    `/drinks/${returnAPI[`${mealOrDrink}s`][0][handleKeyObj('id')]}` // Rota provisória
                  }
                />
              )
            )

        ) }

      { (returnAPI && returnAPI[`${mealOrDrink}s`] !== null) // caso tenha múltiplas receitas
        && (
          (returnAPI[`${mealOrDrink}s`]).slice(0, doze).map((recipe, i) => (
            <div key={ recipe[handleKeyObj('id')] } data-testid={ `${i}-recipe-card` }>
              <img
                data-testid={ `${i}-card-img` }
                style={ { width: '100px' } } // provisório
                src={ recipe[`${handleKeyObj('str')}Thumb`] }
                alt={ recipe[handleKeyObj('str')] }
              />
              <p data-testid={ `${i}-card-name` }>
                { recipe[handleKeyObj('str')] }
              </p>
              <button type="button" onClick={ () => click(recipe[handleKeyObj('id')]) }>
                Mais detalhes!
              </button>
            </div>
          ))
        ) }
    </div>
  );
}

export default Recipes;
