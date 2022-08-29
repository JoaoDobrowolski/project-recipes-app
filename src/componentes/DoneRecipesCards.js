import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipesCards() {
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];

  return (
    <section>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          {
            recipe.type === 'food' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
            )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot}
                </p>
              )
          }
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="img"
          />
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate }
          </p>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="icone de compartilhar"
          />
          <ul>
            {recipe.tags.slice(0, 2).map((tagName, indexTag) => (
              <li
                key={ indexTag }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default CardDoneRecipesCards;
