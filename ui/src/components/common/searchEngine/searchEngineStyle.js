import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    marginBottom: 37,
    boxShadow: "0px  0px 10px #000",
    backgroundColor: "#171718",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSearch: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0px 10px 0px",
  },
  containerInputSearch: {
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  inputSearch: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: 310,
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 600,
    },
  },
  formControl: {
    margin: "10px 10px 0px 10px",
    minWidth: 120,
    maxWidth: 200,
    borderRadius: 4,
  },

  containerAdvanced: {
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyle;
