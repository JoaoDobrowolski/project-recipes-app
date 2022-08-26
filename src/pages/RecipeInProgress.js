import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import meals from '../MockRecipe';

function RecipeInProgress() {
  const { mealOrDrink } = useContext(RecipeAppContext);
  const history = useHistory();
  const [renderAux, setRenderAux] = useState();

  const ingredients = Object.entries(meals[0])
    .filter((el) => (el[1] !== '' && el[0]
      .includes('strIngredient')))
    .map((ing) => ing[1]);

  let filterIds = [];
  let ids = [];
  if (JSON.parse(localStorage.getItem('ingredient'))) {
    ids = JSON.parse(localStorage.getItem('ingredient'));
  }
  const handleCheck = ({ target }) => {
    ids.push(target.id);
    const arrayNoHappy = [...new Set(ids)];
    filterIds = arrayNoHappy;
    if (ids.toString() !== arrayNoHappy.toString()) {
      filterIds = arrayNoHappy.filter((el) => el !== target.id);
      ids = filterIds;
    }
    localStorage.setItem('ingredient', JSON.stringify(filterIds));

    const local = JSON.parse(localStorage.getItem('ingredient'));
    const result = ingredients.length !== local.length;
    setRenderAux(result);
  };

  useEffect(() => {
    console.log(renderAux);
  }, [renderAux]);

  const handleKeyObj = (str) => { // função feita para lidar com o nome da chave do obj retornado da api
    const keyObj = `${str + mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)}`;
    return keyObj;
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="foto"
        src={ meals[0][`${handleKeyObj('str')}Thumb`] }
      />
      <h1 data-testid="recipe-title">{ meals[0][handleKeyObj('str')]}</h1>
      <button data-testid="share-btn" type="button">share</button>
      <button data-testid="favorite-btn" type="button">favorite</button>
      <p data-testid="recipe-category">{meals[0].strCategory}</p>
      {ingredients.map((ing, i) => (

        <label
          htmlFor={ i }
          key={ ing }
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ i }
            className="taxado"
            defaultChecked={ JSON.parse(localStorage
              .getItem('ingredient')) ? JSON.parse(localStorage.getItem('ingredient'))
                .includes(i.toString()) : false }
            onChange={ handleCheck }
          />
          <span>
            {ing}
          </span>
        </label>

      ))}

      <p data-testid="instructions">{ meals[0].strInstructions }</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ renderAux }
        onClick={ () => history.push('/done-recipes') }
      >
        finish recipe

      </button>
    </div>
  );
}

export default RecipeInProgress;
