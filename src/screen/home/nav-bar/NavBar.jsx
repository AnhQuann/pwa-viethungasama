import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FbLogo from '../../../assets/fb.png';
import InstaLogo from '../../../assets/insta.png';
import YoutubeLogo from '../../../assets/youtube.png';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../../components/search-bar/SearchBar';
import ShopLogo from '../../../assets/logo.png';
import { useStyles, theme } from './NavBar.style';
import { MuiThemeProvider } from "@material-ui/core/styles";

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function getStyle (isActive) {
    return isActive ? classes.navItemActive : classes.navItemDefault
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Paper square className={classes.root}>
        <Grid container spacing={0}>
          <Grid item md={2}></Grid>
          <Grid item md={8} className={classes.navContent}>
            <img className={classes.shopLogo} src={ShopLogo} alt="Shop Logo"/>
            <div className={classes.searchBar}>
              <SearchBar placeholder="Bạn muốn tìm gì..." />
            </div>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              classes={{
                indicator: classes.indicator
              }}
              className={classes.tabs}
              aria-label="icon label tabs example"
            >
              <Tab className={getStyle(value === 0)} icon={<PhoneIcon />} label="Hotline" />
              <Tab className={getStyle(value === 1)} icon={<img className={classes.socialLogo} src={FbLogo} alt="Facebook" />} label="Facebook" />
              <Tab className={getStyle(value === 2)} icon={<img className={classes.socialLogo} src={InstaLogo} alt="Instagram" />} label="Instagram" />
              <Tab className={getStyle(value === 3)} icon={<img className={classes.socialLogo} src={YoutubeLogo} alt="Youtube" />} label="Youtube" />
            </Tabs>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
}
