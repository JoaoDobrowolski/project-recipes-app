import React from 'react';
import Header from '../componentes/Header';
import DoneRecipesCards from '../componentes/DoneRecipesCards';

function DoneRecipes() {
  return (
    <>
      <Header page="Done Recipes" search={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <DoneRecipesCards />
    </>
  );
}

export default DoneRecipes;
