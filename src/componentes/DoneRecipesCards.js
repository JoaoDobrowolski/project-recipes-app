import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipesCards.css';

const copy = require('clipboard-copy');
// Retirado de https://www.npmjs.com/package/clipboard-copy

function DoneRecipesCards({ doneRecipes }) {
  const [copiedLink, copiedLinkset] = useState(false);

  const num = 2;
  console.log(doneRecipes);
  const getURL = (item) => {
    const url = `http://localhost:3000/${item.type}s/${item.id}`;

    copy(url);

    copiedLinkset(true);
  };

  return (
    <section>
      {
        copiedLink && <h2>Link copied!</h2>
      }
      { doneRecipes !== []
        && (
          doneRecipes.map((recipe, index) => (
            <div key={ index }>
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                src={ recipe.image }
              >
                <img
                  style={ { width: '100px' } } // provisório
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="img"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>

              <div>
                <div>
                  {
                    recipe.type === 'food' ? (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { `${recipe.nationality} - ${recipe.category}` }
                      </p>
                    )
                      : (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { recipe.category }
                          { recipe.alcoholicOrNot }
                        </p>
                      )
                  }
                  <button
                    type="button"
                    onClick={ () => getURL(recipe) }
                    className="btnURL"
                  >
                    <img
                      src={ shareIcon }
                      alt="share"
                      data-testid={ `${index}-horizontal-share-btn` }
                      className="doneRecipesShare"
                    />
                  </button>
                </div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </h3>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { `Done in: ${recipe.doneDate}` }
                </p>
                <ul>
                  {
                    recipe.tags.slice(0, num).map((tag, indexTag) => (
                      <li
                        className="doneRecipesTag"
                        key={ indexTag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          ))
        ) }
    </section>
  );
}

DoneRecipesCards.propTypes = {
  doneRecipes: PropTypes.arrayOf.isRequired,
};

export default DoneRecipesCards;
