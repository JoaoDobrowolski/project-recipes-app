import React from 'react';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';

function Profile() {
  return (
    <div>
      <Header page="Profile" search={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
