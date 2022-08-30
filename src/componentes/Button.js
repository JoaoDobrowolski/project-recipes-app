import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeAppContext from '../context/RecipeAppContext';
import '../styles/styles.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Button() {
  // console.log(localStorage.setItem('inProgressRecipes', 'sdvsdv'));
  const doneRecipes = localStorage.getItem('doneRecipes');
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  const { id } = useParams();
  // console.log(useLocation());
  const { pathname } = useLocation();
  // console.log(pathname.split('/'));
  const { detailsMeal, detailsDrink } = useContext(RecipeAppContext);
  const history = useHistory();
  const [copyUrl, setCopyUrl] = useState(false);
  const [imageFavorite, setImageFavorite] = useState(false);

  const handleRedirect = () => {
    if (pathname.split('/')[1] === 'foods') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const handleCopy = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopyUrl(true);
  };

  // console.log(detailsMeal.length >= 1);
  // console.log(detailsMeal);
  // console.log(mealOrDrink);

  const handleImageFavorite = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    // console.log(storage);
    // console.log(storage.some((ele) => ele.id === id));
    if (storage.some((ele) => ele.id === id)) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  };

  /* const handleDesfavoritar = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (list.some((ele) => ele.id === id)) {
      const ListOfId = list.filter((ele) => ele.id !== id);
      console.log(ListOfId);
      console.log('quero sair da lista');
      // const posicao = ListOfId.indexOf(id);
      // const newList = ListOfId.splice(posicao, 1);
      // console.log(posicao);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify(ListOfId));
    }
  }; */

  /* const handleFavorite = () => {
    handleDesfavoritar();
    if (detailsMeal.length >= 1) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailsMeal[0];
      const objtMeal = { id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb };
      const listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      listFavorite.push(objtMeal);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify(listFavorite));
      return;
    }
    if (detailsDrink.length >= 1) {
      const { idDrink, strCategory, strAlcoholic, strDrink,
        strDrinkThumb } = detailsDrink[0];
      const objDrink = { id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb };
      const listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      listFavorite.push(objDrink);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify(listFavorite));
    }
  }; */

  const handleFavorite = () => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    // const initial = localStorage.getItem('favoriteRecipes');
    // console.log(!list.some((ele) => ele.id === id));
    if (!list.some((ele) => ele.id === id)) {
      if (detailsMeal.length >= 1) {
        const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailsMeal[0];
        const objtMeal = {
          id: idMeal,
          type: 'food',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        };
        list.push(objtMeal);
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(list));
        setImageFavorite(!imageFavorite);
      }
      if (detailsDrink.length >= 1) {
        const { idDrink, strCategory, strAlcoholic, strDrink,
          strDrinkThumb } = detailsDrink[0];
        const objDrink = {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        };
        list.push(objDrink);
        window.localStorage.setItem('favoriteRecipes', JSON.stringify(list));
        setImageFavorite(!imageFavorite);
      }
    } else {
      const ListOfId = list.filter((ele) => ele.id !== id);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify(ListOfId));
      setImageFavorite(!imageFavorite);
    }
    // handleImageFavorite();
  };

  useEffect(() => { }, [imageFavorite]);

  return (
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
      {
        inProgressRecipes !== null && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start_recipe"
          >
            Continue Recipe
          </button>
        )
      }
      {
        doneRecipes === null && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start_recipe"
            onClick={ handleRedirect }
          >
            Start Recipe
          </button>
        )
      }
    </div>
  );
}

export default Button;
