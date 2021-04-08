import { Box, Typography, makeStyles } from "@material-ui/core";

const Footer = () => {
  const useStyle = makeStyles({
    typography: {
      padding: 20,
      fontFamily: "'Times New Roman', Times, serif",
    },
  });
  const classes = useStyle();
  return (
    <Box
      display="flex"
      justifyContent="center"
      style={{ backgroundColor: "black" }}
      marginTop={10}
    >
      <Typography variant="h3" color="primary" className={classes.typography}>
        Copyright © Abdalla Hasan 2021
      </Typography>
    </Box>
  );
};

export default Footer;
