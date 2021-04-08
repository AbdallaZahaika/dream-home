import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  container: {
    width: "100%",
    minHeight: "100vh",
    maxHeight: "100%",
    marginTop: 0,
  },
  typography: {
    fontFamily: "Georgia, serif",
    color: "#000",
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
    marginTop: 25,
  },
  containerSearch: {
    minWidth: 320,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 4px #000",
  },
  inputSearch: {
    minWidth: "80%",
    padding: 5,
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
});

export default useStyle;
