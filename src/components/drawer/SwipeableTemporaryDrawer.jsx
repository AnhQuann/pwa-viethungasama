import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Home,
  DirectionsBike,
  People,
  Book,
  AccountCircle,
  LocationOn,

} from '@material-ui/icons';

import { withRouter } from 'react-router-dom';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function SwipeableTemporaryDrawer(props) {
  const {
    history,
    openDrawer,
    handleOpenDrawer,
  } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
    handleOpenDrawer(open);
  };

  const aboveFeatures = [
    {
      title: "Trang chủ",
      id: "homepage",
      icon: <Home />,
      route: '/',
    },
    {
      title: "Bảng thông tin",
      id: "infomation-table",
      icon: <DirectionsBike />,
      route: '/iadmin',
    },
    {
      title: "Khách hàng",
      id: "customer",
      icon: <People />,
      route: '/iadmin/people',
    },
    {
      title: "Bài viết",
      id: "blog",
      icon: <Book />,
      route: '/iadmin/blog',
    },
    {
      title: "Tài khoản",
      id: "account",
      icon: <AccountCircle />,
      route: '/iadmin/account',
    },
    {
      title: "Chi nhánh",
      id: "location",
      icon: <LocationOn />,
      route: '/iadmin/location',
    },
  ]

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {aboveFeatures.map((feature, index) => (
          <ListItem button key={`${feature.id}_${index}`} onClick={e => renderFeature(feature)}>
            <ListItemIcon>{feature.icon}</ListItemIcon>
            <ListItemText primary={feature.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  function renderFeature(feature) {
    history.push(feature.route);
  }

  useEffect(() => {
    setState({ ...state, left: openDrawer });
  }, [openDrawer, state])

  return (
    <div>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      
    </div>
  );
}

export default withRouter(SwipeableTemporaryDrawer);