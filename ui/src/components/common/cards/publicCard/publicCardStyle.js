import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  card: {
    width: 300,
    minHeight: 500,
    maxHeight: 600,
    margin: 20,
    boxShadow: "0px 0px 5px #000",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  containerIcons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  typography: {
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    cursor: "default",
    wordBreak: "break-word",
  },
  fontawesomeIcon: {
    marginRight: 5,
    transform: "rotate(28deg)",
    fontSize: 25,
  },
  link: {
    marginLeft: 5,

    textDecoration: "none",
  },
  containerButtons: {
    width: "100%",
    justifyContent: "center",
  },
});

export default useStyle;
