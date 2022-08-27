import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import RecipeAppContext from '../context/RecipeAppContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/styles.css';

const Footer = () => {
  const { setReturnAPI } = useContext(RecipeAppContext);
  const history = useHistory();
  const route = (history.location.pathname);

  const handleMealClick = () => {
    if (route === '/foods') {
      setReturnAPI('');
      return history.push('/drinks');
    }
    setReturnAPI('');
    return history.push('/foods');
  };

  return (
    <footer
      className=".footer"
      data-testid="footer"
    >
      <input
        type="image"
        alt="meal icon"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        onClick={ () => handleMealClick() }
      />
      <input
        type="image"
        alt="drink icon"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => handleMealClick() }
      />
    </footer>
  );
};

export default Footer;
