import React from 'react';
import Footer from '../componentes/Footer';
import { useHistory } from 'react-router-dom';
import Header from '../componentes/Header';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header page="Profile" search={ false } />

      <div>
        <h2 data-testid="profile-email">{ email }</h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout

        </button>
        
      </div>
    <Footer />
    </div>
  );
}

export default Profile;
