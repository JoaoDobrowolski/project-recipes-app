import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeAppContext from '../context/RecipeAppContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksInProgress(props) {
  const { mealOrDrink } = useContext(RecipeAppContext);
  const history = useHistory();
  const [renderAux, setRenderAux] = useState(true);
  const [responseAPI, setResponseAPI] = useState();
  const [ingredients, setIngredients] = useState();
  const [copyUrl, setCopyUrl] = useState(false);
  const [imageFavorite, setImageFavorite] = useState(false);
  const [idDetail, setIdDetail] = useState('');

  const fetchRecipe = async (id) => {
    const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(urlDrinks);
    const json = await response.json();
    setResponseAPI(json.drinks);
    setIngredients(Object.entries(json.drinks[0])
      .filter((el) => (el[1] !== '' && el[1] !== null && el[0]
        .includes('strIngredient')))
      .map((ing) => ing[1]));
  };

  useEffect(() => {
    const { location: { pathname } } = props;
    const id = (pathname.split(/\D+/)[1]);
    setIdDetail(id);
    fetchRecipe(id);
  }, []);

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

  const handleImageFavorite = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    // console.log(storage);
    // console.log(storage.some((ele) => ele.id === id));
    if (storage.some((ele) => ele.id === idDetail)) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  };

  const handleCopy = () => {
    copy(`http://localhost:3000/drinks/${idDetail}`);
    setCopyUrl(true);
  };

  const handleFavorite = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (!list.some((ele) => ele.id === idDetail)) {
      if (responseAPI.length >= 1) {
        const { idDrink, strCategory, strAlcoholic, strDrink,
          strDrinkThumb } = responseAPI[0];
        const objDrink = { id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb };
        list.push(objDrink);
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(list));
        setImageFavorite(!imageFavorite);
      }
    } else {
      const ListOfId = list.filter((ele) => ele.id !== idDetail);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify(ListOfId));
      setImageFavorite(!imageFavorite);
    }
  };

  return (
    <div>
      {responseAPI && ingredients
      && (
        <div>
          <img
            data-testid="recipe-photo"
            alt="foto"
            src={ responseAPI[0][`${handleKeyObj('str')}Thumb`] }
          />
          <h1 data-testid="recipe-title">{ responseAPI[0][handleKeyObj('str')]}</h1>
          {/* <button data-testid="share-btn" type="button">share</button> */}
          {/* <button data-testid="favorite-btn" type="button">favorite</button> */}
          <p data-testid="recipe-category">{responseAPI[0].strCategory}</p>
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

          <p data-testid="instructions">{ responseAPI[0].strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ renderAux }
            onClick={ () => history.push('/done-recipes') }
          >
            finish recipe

          </button>
        </div>
      )}

      <div>
        <input
          type="image"
          alt="meal icon"
          src={ shareIcon }
          data-testid="share-btn"
          onClick={ handleCopy }
        />
        {
          copyUrl && <p>Link copied!</p>
        }
        <input
          type="image"
          alt="meal icon"
          src={ handleImageFavorite() }
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        />
      </div>

    </div>
  );
}

DrinksInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinksInProgress;
