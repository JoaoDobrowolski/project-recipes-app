import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function Recipes() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const doze = 12; // magic numbers

  const {
    returnAPI, mealOrDrink } = useContext(RecipeAppContext);

  const handleKeyObj = (str) => { // função feita para lidar com o nome da chave do obj retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
  };

  const click = async (id) => {
    console.log(pathname);
    if (mealOrDrink === 'meal') {
      return history.push(`/foods/${id}`);
    }
    return history.push(`/drinks/${id}`);
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
      {/* <RecipeDetails /> */}
    </div>
  );
}

export default Recipes;
