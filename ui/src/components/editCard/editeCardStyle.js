import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  myContainer: {
    width: "100%",
    height: "100%",
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
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
  },
  card: {
    maxWidth: 500,
    marginTop: 20,
    margin: "20px 0px 200px 0px ",
    backgroundColor: "light",
    boxShadow: "0px 0px 15px #000",
  },
  containerButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    width: "30%",
    margin: "20px 0px 10px 0px",
  },
  containerTypography: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  containerRadio: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  addFeatureContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addFeatureInput: {
    width: "78%",
  },
  addFeatureButton: {
    width: "20%",
  },

  featuresContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  feature: {
    padding: 5,
    margin: 5,
  },
});

export default useStyles;
