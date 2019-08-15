import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './App.css'

import Admin from './screen/admin/Admin';
import HomePage from './screen/home/HomePage';

function App() {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/iadmin' component={Admin} />
    </Switch>
  );
}

export default App;
