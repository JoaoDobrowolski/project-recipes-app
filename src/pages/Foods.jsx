import React, { useContext, useEffect } from 'react';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Recipes from '../componentes/Recipes';
import RecipeAppContext from '../context/RecipeAppContext';

function Foods() {
  const { setMealOrDrink } = useContext(RecipeAppContext);

  useEffect(() => { setMealOrDrink('meal'); }, []);

  return (
    <div>
      <Header page="Foods" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
