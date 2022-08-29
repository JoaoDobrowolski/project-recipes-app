/* import React from 'react';
import RecipeDetails from '../componentes/RecipeDetails';

function DrinksId() {
  return (
    <div>
      <RecipeDetails />
    </div>
  );
}

export default DrinksId; */

import React, { useContext, useEffect, useState } from 'react';
import Button from '../componentes/Button';
import RecipeDetails from '../componentes/RecipeDetails';
import RecipeAppContext from '../context/RecipeAppContext';

function FoodsId() {
  const {
    detailsDrink,
  } = useContext(RecipeAppContext);
  const [mealsRecommended, setMealsRecommended] = useState();

  const fetchRecommended = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    // console.log(json);
    setMealsRecommended(json);
  };

  useEffect(async () => {
    await fetchRecommended();
  }, []);

  // const oito = 8;
  const seis = 6;

  if (mealsRecommended !== undefined) {
    /* const eigthDrinks = mealsRecommended.meals.slice(0, oito).map((meal) => meal)
      .filter((e) => e.strMeal !== 'Burek' && e.strMeal !== 'Tamiya');
    console.log(eigthDrinks); */
  }

  return (
    <div>
      <RecipeDetails />
      <h1>Renderizar o details</h1>
      {
        detailsDrink.length === 0 ? (
          <p>Loading</p>
        ) : (
          <>
            {
              detailsDrink
                .map((e) => (
                  <section key={ e.idDrink }>
                    <img
                      data-testid="recipe-photo"
                      src={ e.strDrinkThumb }
                      alt="imagem recipe"
                      style={ { width: '100px' } }
                    />
                    <p
                      data-testid="recipe-title"
                    >
                      {e.strDrink}
                    </p>
                    <p
                      data-testid="recipe-category"
                    >
                      {e.strAlcoholic}
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
                    {/* <iframe
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
                    /> */}
                  </section>
                ))
            }
          </>
        )
      }
      <div>
        {
          mealsRecommended === undefined ? (
            <p>Loading</p>
          ) : (
            <div className="recommended_Card">
              <div className="recommended">
                {
                  mealsRecommended.meals.slice(0, seis)
                    .map((meals, index) => (
                      <section
                        key={ meals.idMeals }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <img
                          src={ meals.strMealThumb }
                          alt="imagem recipe"
                          style={ { width: '100px' } }
                        />
                        <h3>{ meals.strCategory }</h3>
                        <p
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { meals.strMeal}
                        </p>
                      </section>
                    ))
                }
              </div>
            </div>
          )
        }
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
}
export default FoodsId;
