import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useStyles, theme } from './Menu.style';
import { MuiThemeProvider } from "@material-ui/core/styles";

export default function Menu(props) {
  const { menuItems } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function getStyle (isActive) {
    return isActive ? classes.menuItemActive : classes.menuItemDefault
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        {menuItems.map((item, index) => (
          <BottomNavigationAction key={`menu-item-${index}`} className={getStyle(value === index)} label={item.name} icon={item.icon} />        
        ))}
      </BottomNavigation>
    </MuiThemeProvider>
  );
}
