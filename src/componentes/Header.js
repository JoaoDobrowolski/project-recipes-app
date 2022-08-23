import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeAppContext from '../context/RecipeAppContext';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ page, search }) {
  const history = useHistory();

  const { searchBarVisible, setSearchBarVisible } = useContext(RecipeAppContext);

  const handleClickProfile = () => {
    setSearchBarVisible(false);
    history.push('/profile');
  };

  return (
    <header>
      <div>
        <button
          onClick={ () => handleClickProfile() }
          type="button"
          data-testid="btn-profile"
        >
          <img
            src={ iconProfile }
            alt="icon-profile"
            data-testid="profile-top-btn"

          />
        </button>
        { search && (
          <button
            type="button"
            onClick={ () => (
              searchBarVisible ? setSearchBarVisible(false) : setSearchBarVisible(true)
            ) }
          >
            <img
              data-testid="search-top-btn"
              src={ iconSearch }
              alt="icon-search"
            />
          </button>) }

        <h1 data-testid="page-title">
          { page }
        </h1>

        { searchBarVisible
          && <SearchBar /> }
      </div>
    </header>
  );
}
Header.propTypes = {
  page: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = { search: true };

export default Header;
