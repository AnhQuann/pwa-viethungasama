import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  Home,
  People,
  DirectionsBike,
  LocationOn,
  Build,
  LocalShipping
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  menuItemDefault: {
    color: "#a1bbd6"
  },
  menuItemActive: {
    color: "#0090E6 !important"
  },
});

export default function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function getStyle (isActive) {
    return isActive ? classes.menuItemActive : classes.menuItemDefault
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={getStyle(value === 0)} label="Trang chủ" icon={<Home />} />
      <BottomNavigationAction className={getStyle(value === 1)} label="Về VHBIKE" icon={<People />} />
      <BottomNavigationAction className={getStyle(value === 2)} label="Sản phẩm" icon={<DirectionsBike />} />
      <BottomNavigationAction className={getStyle(value === 3)} label="Hệ thống đại lý" icon={<LocationOn />} />
      <BottomNavigationAction className={getStyle(value === 4)} label="Bảo hành" icon={<Build />} />
      <BottomNavigationAction className={getStyle(value === 5)} label="Vận chuyển" icon={<LocalShipping />} />
    </BottomNavigation>
  );
}