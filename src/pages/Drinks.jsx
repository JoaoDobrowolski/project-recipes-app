import React, { useContext, useEffect } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Recipes from '../componentes/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';

function Drinks() {
  const { setMealOrDrink } = useContext(RecipeAppContext);

  useEffect(() => { setMealOrDrink('drink'); }, []);

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
