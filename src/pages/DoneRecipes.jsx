import React from 'react';
import Header from '../componentes/Header';

function DoneRecipes() {
  return (
    <div>
      <Header page="Done Recipes" search={ false } />
      <h1>Componentes com refeitas realizadas!</h1>
    </div>
  );
}

export default DoneRecipes;
