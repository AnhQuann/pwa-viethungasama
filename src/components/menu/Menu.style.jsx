import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  menuItemDefault: {
    color: "#a1bbd6"
  },
  menuItemActive: {
    color: "#0090E6 !important",
    fontWeight: "bold"
  },
});

export const theme = createMuiTheme({
  overrides: {
    MuiBottomNavigation: {
      root: {
        height: 75
      },
    },
    MuiBottomNavigationAction: {
      root: {
        padding: "6px 0px 8px",
        outline: "none !important",
        flex: 1,
        maxWidth: "unset"
      }
    }
  }
});