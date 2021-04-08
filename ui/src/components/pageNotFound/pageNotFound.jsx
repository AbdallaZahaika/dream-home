import { Typography,  Container } from "@material-ui/core";
import useStyle from "./pageNotFoundStyle";
const PageNotFound = () => {
  const classes = useStyle();
  return (
    <Container className={classes.contaienr}>
      <Typography variant="h2" className={classes.typography}>
        Page NotFound 404
      </Typography>
    </Container>
  );
};

export default PageNotFound;
