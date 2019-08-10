import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import EnhancedTableHead from './table/EnhancedTableHead';
import Blog from './blog/Blog';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path='/iadmin' component={EnhancedTableHead} /> */}
          {/* <Route exact path='/iadmin' component={EnhancedTableHead} /> */}
          <Route exact path='/iadmin/blog' component={Blog} />
          {/* <Route exact path='/iadmin/customer' component={EnhancedTableHead} /> */}
          <Route exact path='/iadmin' component={EnhancedTableHead} />
        </Switch>
      </div>
    );
  }
}

export default Main;