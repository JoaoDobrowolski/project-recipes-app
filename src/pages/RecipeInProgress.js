import React from 'react';

function RecipeInProgress() {
  return (
    <div>
      <img data-testid="recipe-photo" alt="foto" />
      <h1 data-testid="recipe-title">Titulo</h1>
      <button data-testid="share-btn" type="button">share</button>
      <button data-testid="favorite-btn" type="button">favorite</button>
      <p data-testid="recipe-category">recipe category</p>
      <p data-testid={ `${index}-ingredient-step}` }> ingredients</p>
      <p data-testid="instructions">instructions</p>
      <button data-testid="finish-recipe-btn" type="button">finish recipe</button>
    </div>
  );
}

export default RecipeInProgress;
