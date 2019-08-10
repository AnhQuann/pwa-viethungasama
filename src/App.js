import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './App.css'

import Admin from './screen/admin/Admin';
import Home from './screen/home/Home';

function App() {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/iadmin' component={Admin} />
    </Switch>
  );
}

export default App;
