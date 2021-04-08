import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  container: {
    width: "100%",
    minHeight: "100vh",
    maxHeight: "100%",
    marginTop: 0,
  },
  containerTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  typography: {
    fontFamily: "Georgia, serif",
    color: "#000",
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
    marginTop: 25,
  },
  gallery: {
    height: "600px",
    margin: "30px 0px 40px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 10px #000",
  },
});

export default useStyle;
