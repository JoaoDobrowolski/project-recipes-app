import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function FoodsInProgress() {
  const { mealOrDrink, detailsMeal } = useContext(RecipeAppContext);
  const history = useHistory();
  const [renderAux, setRenderAux] = useState();

  console.log(detailsMeal);
  console.log(typeof (detailsMeal));

  const ingredients = detailsMeal !== '' && Object.entries(detailsMeal[0])
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
    const arrayNoRep = [...new Set(ids)];
    filterIds = arrayNoRep;
    if (ids.toString() !== arrayNoRep.toString()) {
      filterIds = arrayNoRep.filter((el) => el !== target.id);
      ids = filterIds;
    }
    localStorage.setItem('ingredient', JSON.stringify(filterIds));

    const local = JSON.parse(localStorage.getItem('ingredient'));
    const result = ingredients.length !== local.length;
    setRenderAux(result);
  };

  useEffect(() => {
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
        src={ detailsMeal[0][`${handleKeyObj('str')}Thumb`] }
      />
      <h1 data-testid="recipe-title">{ detailsMeal[0][handleKeyObj('str')]}</h1>
      <button data-testid="share-btn" type="button">share</button>
      <button data-testid="favorite-btn" type="button">favorite</button>
      <p data-testid="recipe-category">{detailsMeal[0].strCategory}</p>
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

      <p data-testid="instructions">{ detailsMeal[0].strInstructions }</p>
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

export default FoodsInProgress;
