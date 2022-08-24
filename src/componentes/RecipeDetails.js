import React, { useContext, useEffect } from 'react';
import RecipeAppContext from '../context/RecipeAppContext';

function RecipeDetails() {
  const { recipesDetails, id, setRecipesDetails } = useContext(RecipeAppContext);
  // const [recipies, setRecipies] = useState();

  const fetchRecipie = async () => {
    const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(urlMeals);
    const json = await response.json();
    setRecipesDetails(json);
  };

  useEffect(() => {
    fetchRecipie();
  }, [id]);

  return (
    <div>
      {
        recipesDetails ? <h1>Loading...</h1> : console.log(recipesDetails)
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
