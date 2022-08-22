import PropTypes from 'prop-types';
import React from 'react';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

function Header(props) {
  const { children } = props;
  return (
    <div>
      <img
        src={ iconProfile }
        alt="icon-profile"
        data-testid="profile-top-btn"
      />
      <img
        src={ iconSearch }
        alt="icon-search"
        data-testid="search-top-btn"
      />
      <h1 data-testid="page-title">
        { children }
      </h1>
    </div>
  );
}
Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
