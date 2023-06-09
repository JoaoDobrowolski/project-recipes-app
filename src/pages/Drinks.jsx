import React, { useContext, useEffect } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Recipes from '../componentes/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';

function Drinks() {
  const cinco = 5;

  const { setMealOrDrink, setReturnAPI, setCategory } = useContext(RecipeAppContext);

  const getDrinkAPI = async () => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    setReturnAPI(json);
  };

  const getCategories = async () => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const json = await response.json();
    const fiveCategories = json.drinks.slice(0, cinco);
    setCategory(fiveCategories);
  };

  useEffect(() => {
    setMealOrDrink('drink');
    getCategories();
    getDrinkAPI();
  }, []);

  return (
    <div>
      <Header page="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;

/*
Se for um único drink, renderiza o header, o drink e o footer
*/
