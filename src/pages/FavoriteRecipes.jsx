import React, { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipeAppContext from '../context/RecipeAppContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { mealOrDrink } = useContext(RecipeAppContext);
  const [copyUrl, setCopyUrl] = useState(false);
  const [desfav, setDesfav] = useState(false);
  const [categ, setCateg] = useState();
  const [filtered, setFiltered] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);

  const favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  const handleCopy = ({ target }) => {
    setCopyUrl(true);
    if (mealOrDrink === 'meal') {
      return copy(`http://localhost:3000/foods/${target.value}`);
    }
    return copy(`http://localhost:3000/drinks/${target.value}`);
  };

  const handleFavorite = ({ target }) => {
    const list = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const ListOfId = list.filter((ele) => ele.id !== target.value);
    localStorage.setItem('favoriteRecipes', JSON.stringify(ListOfId));
    setDesfav(!desfav);
  };

  useEffect(() => {
    if (categ === 'food') {
      const aux = favoriteRecipes.filter((el) => el.type === 'food');
      setFiltered(aux);
    } else if (categ === 'drink') {
      const aux = favoriteRecipes.filter((el) => el.type === 'drink');
      setFiltered(aux);
    } else {
      setFiltered(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    }
  }, [categ, desfav]);

  return (
    <div>
      <Header page="Favorite Recipes" search={ false } />
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ () => setCateg('all') }
      >
        All
      </button>
      <button
        type="button"
        name="food"
        data-testid="filter-by-food-btn"
        onClick={ () => setCateg('food') }
      >
        Food
      </button>
      <button
        type="button"
        name="drinks"
        data-testid="filter-by-drink-btn"
        onClick={ () => setCateg('drink') }
      >
        Drinks
      </button>

      <section>
        { (
          filtered
            .map((recipe, index) => (
              <div key={ index }>
                <Link
                  to={ recipe.type === 'food'
                    ? (
                      `/foods/${recipe.id}`
                    )
                    : (
                      `/drinks/${recipe.id}`) }
                >
                  {
                    recipe.type === 'food' ? (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { `${recipe.nationality} - ${recipe.category}` }
                      </p>
                    )
                      : (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { recipe.alcoholicOrNot }
                        </p>
                      )
                  }
                  <img
                    style={ { width: '100px' } } // provisório
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    className="img"
                  />
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipe.name }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    { recipe.doneDate }
                  </p>
                </Link>
                <input
                  value={ recipe.id }
                  type="image"
                  alt="icone de compartilhar"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ handleCopy }
                />

                <input
                  src={ blackHeartIcon }
                  value={ recipe.id }
                  type="image"
                  alt="favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ handleFavorite }
                />
              </div>

            ))) }
        {
          copyUrl && <p>Link copied!</p>
        }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
