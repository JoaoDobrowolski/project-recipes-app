import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

function Header({ page, search }) {
  const history = useHistory();
  return (
    <header>
      <div>
        <button
          type="button"
          data-testid="btn-profile"
          onClick={ () => { history.push('/profile'); } }
        >
          <img
            src={ iconProfile }
            alt="icon-profile"
            data-testid="profile-top-btn"

          />
        </button>
        {search && (
          <button type="button">
            <img
              src={ iconSearch }
              alt="icon-search"
              data-testid="search-top-btn"
            />
          </button>)}

        <h1 data-testid="page-title">
          { page }
        </h1>
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
