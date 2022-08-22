import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import DrinksId from './pages/DrinksId';
import Foods from './pages/Foods';
import FoodsId from './pages/FoodsId';
import FoodsInProgress from './pages/FoodsInProgress';
import Profile from './pages/Profile';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/foods" component={ Foods } />
        <Route path="/foods/:id-da-receita" componet={ FoodsId } />
        <Route path="/foods/:id-da-receita/in-progress" component={ FoodsInProgress } />
        <Route exact path="drinks" component={ Drinks } />
        <Route path="/drinks/:id-da-receita" component={ DrinksId } />
        <Route path="/drinks/:id-da-receita/in-progress" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component="Done Recipes" />
        <Route path="/favorite-recipes" component="Favorite Recipes" />
      </Switch>
    </div>
  );
}

export default App;
