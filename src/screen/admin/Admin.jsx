import React from 'react';

import shopLogo from '../../assets/logo.png'

import PrimarySearchAppBar from '../../components/app-bar/PrimarySearchAppBar';
import Main from './main/Main';

function Admin() {
    return (
      <div>
        <PrimarySearchAppBar
          openDrawerFeature
          shopLogo={shopLogo}
        />
        <Main />
      </div>
    );
}

export default Admin;