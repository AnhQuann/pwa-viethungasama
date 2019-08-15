import React from 'react';
import Menu from '../menu/Menu';
import { useStyles } from './Products.style';
import Card from '../card/Card';
import Button from '@material-ui/core/Button';
import { ArrowDropDown } from '@material-ui/icons';

const Products = props => {
  const { tagName, menuItems, products } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.tagMenu}>
        <div className={classes.tagName}>{tagName}</div>
        <Menu menuItems={menuItems}/>
      </div>
      <div className={classes.products}>
        {products.map((product, index) => (
          <div className={classes.bike}><Card /></div>
        ))}
      </div>
      <div className={classes.loadMore}>
        <Button className={classes.btnLoadMore}>
          Xem thêm
          <ArrowDropDown />
        </Button>
      </div>
    </div>
  );
}

export default Products;