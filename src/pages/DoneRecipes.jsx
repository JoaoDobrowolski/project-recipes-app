import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import DoneRecipesCards from '../componentes/DoneRecipesCards';

function DoneRecipes() {
  const [recipeFilter, recipeFilterSet] = useState([]);

  const done = () => {
    if (localStorage.getItem('doneRecipes')) {
      recipeFilterSet(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  };

  useEffect(() => {
    done();
  }, []);

  const handleFilterRecipes = ({ target }) => {
    const { name } = target;

    done();

    if (name !== 'all') {
      const recRecipes = recipeFilter.filter((item) => item.type === name);
      recipeFilterSet(recRecipes);
    }
  };

  return (
    <div>
      <Header page="Done Recipes" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ (e) => handleFilterRecipes(e) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ (e) => handleFilterRecipes(e) }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ (e) => handleFilterRecipes(e) }
        >
          Drinks
        </button>
      </div>
      <DoneRecipesCards doneRecipes={ recipeFilter } />
    </div>
  );
}
export default DoneRecipes;
