import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeDetails(props) {
  const { recipesDetails,
    // id,
    setRecipesDetails } = useContext(RecipeAppContext);
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const fetchRecipie = async () => {
    const foodOrDrink = pathname.split('/');
    if (foodOrDrink[1] === 'foods') {
      const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(urlMeals);
      const json = await response.json();
      return setRecipesDetails(json);
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
