import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "30px 0px"
  },
  tagMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tagName: {
    fontSize: "1.5em",
    minWidth: "33.33%",
    fontWeight: "bold",
    backgroundColor: "#0090E6",
    height: 75,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  products: {
    display: "flex",
    flexWrap: "wrap",
    margin: "15px -4.5px 15px"
  },
  bike: {
    flexGrow: 1,
    maxWidth: "33.33%",
    padding: "0 4.5px",
    boxSizing: "border-box",
    marginBottom: "10px"
  },
  loadMore: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  btnLoadMore: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0090E6",
    outline: "none !important"
  }
});