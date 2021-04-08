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
  },
  Shadow: {
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,1)",
  },
  card: {
    maxWidth: 500,
    marginTop: 20,
    backgroundColor: "light",
    boxShadow: "0px 0px 15px #000",
  },
  containerButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    margin: "20px 0px 10px 0px",
  },
  containerTypography: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default useStyles;
