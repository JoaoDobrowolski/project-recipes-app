import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/recipeInProgress.css';

import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import DrinksId from './pages/DrinksId';
import DrinksInProgress from './pages/DrinksInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import FoodsId from './pages/FoodsId';
import FoodsInProgress from './pages/FoodsInProgress';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" componet={ FoodsId } />
        <Route
          path="/foods/:id/in-progress"
          render={ (props) => <FoodsInProgress { ...props } /> }
        />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DrinksId } />
        <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/recipe-in-progress" component={ RecipeInProgress } />
      </Switch>
    </div>
  );
}

export default App;
