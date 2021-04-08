import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  contaienr: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  typography: {
    marginTop: 50,
    fontFamily: "Georgia, serif",
    color: "#000",
    textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
  },

  containerCards: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    minWidth: 350,
    maxWidth: 500,
    margin: 70,
    backgroundColor: "light",
    boxShadow: "0px 0px 15px #000",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  containerButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 70,
  },
  green: {
    color: "#58D874",
  },
  h6: {
    display: "flex",
    alignItems: "center",
  },
});

export default useStyle;
