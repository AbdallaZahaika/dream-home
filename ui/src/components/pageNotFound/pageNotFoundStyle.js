import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  contaienr: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  typography: {
    fontFamily: "Georgia, serif",
    color: "#000",
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,1)",
  },
});

export default useStyle;
