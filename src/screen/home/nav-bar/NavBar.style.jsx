import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";


export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#0090e6",
  },
  indicator: {
    backgroundColor: "#F8F8F8"
  },
  navContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  navItemDefault: {
    color: "#B6D3F1",
  },
  navItemActive: {
    color: "#F8F8F8"
  },
  shopLogo: {
    width: 200,
    height: 40,
    maxWidth: "33.33%",
    flex: 1,
  },
  socialLogo: {
    width: 24,
    height: 24
  },
  searchBar: {
    flex: 3,
  },
  tabs: {
    flex: 2
  }
});

export const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        maxWidth: "33.33%"
      },
    },
    MuiTab: {
      root: {
        minWidth: "100px !important"
      },
    }
  }
});