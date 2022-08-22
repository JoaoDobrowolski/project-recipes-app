import PropTypes from 'prop-types';
import React from 'react';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

function Header({ children, search }) {
  // const { children } = props;
  return (
    <div>
      <button type="button">
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
        { children }
      </h1>
    </div>
  );
}
Header.propTypes = {
  children: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = { search: true };

export default Header;
