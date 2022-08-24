import React, { useContext, useEffect } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Recipes from '../componentes/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';

function Foods() {
  const cinco = 5;

  const { setMealOrDrink, setReturnAPI, setCategory } = useContext(RecipeAppContext);

  const getMealAPI = async () => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    setReturnAPI(json);
    // console.log(json);
  };

  const getCategories = async () => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const json = await response.json();
    const fiveCategories = json.meals.slice(0, cinco);
    setCategory(fiveCategories);
  };

  useEffect(() => {
    setMealOrDrink('meal');
    getCategories();
    getMealAPI();
  }, []);

  return (
    <div>
      <Header page="Foods" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
