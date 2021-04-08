import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  myContainer: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  typography: {
    marginTop: 20,
    fontFamily: "Georgia, serif",
    color: "#000",
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
  },
  Shadow: {
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,1)",
  },
  card: {
    maxWidth: 400,
    marginTop: 20,
    marginBottom: 200,
    backgroundColor: "light",
    boxShadow: "0px 0px 15px #000",
  },
  containerButton: {
    width: "100%",
  },
});

export default useStyles;
