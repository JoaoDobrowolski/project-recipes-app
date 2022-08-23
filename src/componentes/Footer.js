import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/styles.css';

const Footer = () => {
  const history = useHistory();

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
        onClick={ () => history.push('/foods') }
      />
      <input
        type="image"
        alt="drink icon"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
    </footer>
  );
};

export default Footer;
