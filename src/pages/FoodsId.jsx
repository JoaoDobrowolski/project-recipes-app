import React, { useContext } from 'react';
import RecipeDetails from '../componentes/RecipeDetails';
import RecipeAppContext from '../context/RecipeAppContext';

function FoodsId() {
  const {
    detailsMeal,
  } = useContext(RecipeAppContext);
  return (
    <div>
      <RecipeDetails />
      <h1>Renderizar o details</h1>
      {
        detailsMeal.length === 0 ? (
          <p>Loading</p>
        ) : (
          <>
            {
              detailsMeal
                .map((e) => (
                  <section key={ e.idMeal }>
                    <img
                      data-testid="recipe-photo"
                      src={ e.strMealThumb }
                      alt="imagem recipe"
                      style={ { width: '100px' } }
                    />
                    <p
                      data-testid="recipe-title"
                    >
                      {e.strMeal}
                    </p>
                    <p
                      data-testid="recipe-category"
                    >
                      {e.strCategory}
                    </p>
                    <p
                      data-testid="0-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient1} - ${e.strMeasure1}`}
                    </p>
                    <p
                      data-testid="1-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient2} - ${e.strMeasure2}`}
                    </p>
                    <p
                      data-testid="2-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient3} - ${e.strMeasure3}`}
                    </p>
                    <p
                      data-testid="3-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient4} - ${e.strMeasure4}`}
                    </p>
                    <p
                      data-testid="4-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient5} - ${e.strMeasure5}`}
                    </p>
                    <p
                      data-testid="5-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient6} - ${e.strMeasure6}`}
                    </p>
                    <p
                      data-testid="6-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient7} - ${e.strMeasure7}`}
                    </p>
                    <p
                      data-testid="7-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient8} - ${e.strMeasure8}`}
                    </p>
                    <p
                      data-testid="8-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient9} - ${e.strMeasure9}`}
                    </p>
                    <p
                      data-testid="9-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient10} - ${e.strMeasure10}`}
                    </p>
                    <p
                      data-testid="10-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient11} - ${e.strMeasure11}`}
                    </p>
                    <p
                      data-testid="11-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient12} - ${e.strMeasure12}`}
                    </p>
                    <p
                      data-testid="12-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient13} - ${e.strMeasure13}`}
                    </p>
                    <p
                      data-testid="13-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient14} - ${e.strMeasure14}`}
                    </p>
                    <p
                      data-testid="14-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient15} - ${e.strMeasure15}`}
                    </p>
                    <p
                      data-testid="15-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient16} - ${e.strMeasure16}`}
                    </p>
                    <p
                      data-testid="16-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient17} - ${e.strMeasure17}`}
                    </p>
                    <p
                      data-testid="17-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient18} - ${e.strMeasure18}`}
                    </p>
                    <p
                      data-testid="18-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient19} - ${e.strMeasure19}`}
                    </p>
                    <p
                      data-testid="19-ingredient-name-and-measure"
                    >
                      {`${e.strIngredient20} - ${e.strMeasure20}`}
                    </p>
                    <p
                      data-testid="instructions"
                    >
                      {e.strInstructions}
                    </p>
                    <iframe
                      data-testid="video"
                      width="100"
                      height="100"
                      src={ e.strYoutube }
                      frameBorder="0"
                      allow="accelerometer;
                       autoplay;
                        clipboard-write;
                         encrypted-media;
                          gyroscope;
                           picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                    <p
                      data-testid="0-recomendation-card"
                    >
                      {e.strDrinkAlternate}
                    </p>

                  </section>
                ))
            }
          </>
        )
      }
    </div>
  );
}

export default FoodsId;

/* import React from 'react';
import RecipeDetails from '../componentes/RecipeDetails';

function FoodsId() {
  return (
    <div>
      <RecipeDetails />
    </div>
  );
}

export default FoodsId; */
