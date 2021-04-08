import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    width: "50%",
    marginTop: 50,
    wordBreak: "break-all",
  },
  gallery: {
    height: "600px",
    margin: "30px 0px 40px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 10px #000",
  },

  typography: {
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    cursor: "default",
  },
  link: {
    marginLeft: 5,
    textDecoration: "none",
  },
  card: {
    minHeight: "250px",
    padding: "50px",
    marginBottom: 50,
  },
  detailsContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerDetail: {
    display: "flex",
    justifyContent: "space-between",
  },
  featureaContaienr: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },

  feature: {
    padding: 5,
    margin: 5,
  },
  button: {
    marginBottom: 50,
  },
});

export default useStyle;
