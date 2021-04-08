import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#0F0F0F",
  },
  containerLinks: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  indicator: {
    backgroundColor: "#000",
  },
  selectedTab: {
    color: "#B7B7B7",
  },
}));

export default useStyles;
