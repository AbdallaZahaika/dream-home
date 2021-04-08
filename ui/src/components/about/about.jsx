/* eslint-disable react/jsx-no-target-blank */
import { Typography, CardMedia, Container, Grid } from "@material-ui/core";
import useStyle from "./aboutStyle";
import { useEffect } from "react";
import skyBackGround from "../../images/sky.jpg";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyle();
  return (
    <Container className={classes.contaienr}>
      <Grid container justify="center">
        <Grid item xs={11} sm={11} lg={11}>
          <CardMedia image={skyBackGround} className={classes.contanerContent}>
            <Typography variant="h2" style={{ textDecoration: "underline" }}>
              About Me
            </Typography>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              I am Abdalla Zahaika, learning full-stack developer, and this is
              my graduation project from HackerU College. This website will help
              you find your dream home or sell or rent as soon as possible
            </Typography>
            <Typography variant="h5">I hope you like it.</Typography>
            <Typography variant="h4">this is my GitHub account</Typography>
            <a
              href="https://github.com/AbdallaZahaika"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <Typography variant="h6" style={{ color: "#fff" }}>
                https://github.com/AbdallaZahaika
              </Typography>
            </a>
            <Typography variant="h4">this is my linkedin account</Typography>
            <a
              href="https://www.linkedin.com/in/abdalla-zahaika-8a7ba7206/"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <Typography variant="h6" style={{ color: "#fff" }}>
                https://www.linkedin.com/in/abdalla-zahaika-8a7ba7206/
              </Typography>
            </a>
          </CardMedia>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
