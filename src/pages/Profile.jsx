import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';

function Profile() {
  const history = useHistory();

  const [emailStorage, setEmailStorage] = useState('email@example.com');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      setEmailStorage(email);
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header page="Profile" search={ false } />

      <div>
        <h2 data-testid="profile-email">{ emailStorage }</h2>
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
