import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeDetails() {
  const { setRecipesDetails, recipesDetails } = useContext(RecipeAppContext);
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const fetchRecipie = async () => {
    const foodOrDrink = pathname.split('/');
    if (foodOrDrink[1] === 'foods') {
      const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(urlMeals);
      const json = await response.json();
      const { meals } = json;
      setRecipesDetails(meals);
      Object.keys(recipesDetails);
    }
    if (foodOrDrink[1] === 'drinks') {
      const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log('if drinks');
      const response = await fetch(urlDrinks);
      const json = await response.json();
      return setRecipesDetails(json);
    }
  };

  useEffect(async () => {
    await fetchRecipie();
  }, []);

  return (
    <div>
      <h1>Renderizar o details</h1>
      {
        recipesDetails.length === 0 ? (
          <p>Loading</p>
        ) : (
          <>
            {
              recipesDetails
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
                      data-testid={ `${e.strIngredient1}-ingredient-name-and-measure` }
                    >
                      {`${e.strIngredient1} - ${e.strMeasure1}`}
                    </p>
                    <p
                      data-testid="instructions"
                    >
                      {e.strInstructions}
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

export default RecipeDetails;

/*
1 - pegar o id da url
--- saber se é comida ou drink
2 - jogar na API
-- ver os dados da api vindo.
3 - destrinchar cada nfo da fetch
-- salvar no estado
-- pegar as infomações
*/
