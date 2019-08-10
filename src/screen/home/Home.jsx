import React from 'react';
import NavBar from './nav-bar/NavBar';
import Menu from './menu/Menu';
import Carousel from './carousel/Carousel';
import Grid from '@material-ui/core/Grid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function Products () {
  return (
    <div>
      <NavBar />
      <Menu />
      <Grid container spacing={0}>
        <Grid item md={2}></Grid>
        <Grid item md={8} style={{ display: "flex", flexDirection:"column", alignItems: "center" }}>
          <Carousel />
          
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </div>
  );
}

export default Products;