import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  contaienr: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  contanerContent: {
    height: "600px",
    margin: "30px 0px 40px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 10px #000",
  },
});

export default useStyle;
