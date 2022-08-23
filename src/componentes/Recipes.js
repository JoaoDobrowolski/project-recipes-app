import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function Recipes() {
  const doze = 12; // magic numbers

  const { returnAPI, mealOrDrink } = useContext(RecipeAppContext);

  const handleKeyObj = (str) => { // função feita para lidar com o nome da chave do obj retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
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
            </div>
          ))
        ) }
    </div>
  );
}

export default Recipes;
