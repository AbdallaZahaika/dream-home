import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { CheckCircle, Close } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import useStyle from "./CAstyle";
import { getCurrentUser } from "../../../services/userService";
import { useEffect } from "react";
const ChooseAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyle();
  /// this if check if the user logged
  /// if true Redirect to /
  if (getCurrentUser()) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.contaienr}>
      <Typography variant="h3" className={classes.typography}>
        Choose your Plan
      </Typography>
      <div className={classes.containerCards}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h4">Free</Typography>
            <Typography variant="h5">
              $0/<Typography variant="caption">month</Typography>
            </Typography>
            <div>
              <Typography variant="h6" className={classes.h6}>
                <CheckCircle className={classes.green} /> add 3 houses in a
                month
              </Typography>
              <Typography variant="h6" className={classes.h6}>
                <Close color="error" /> In the first results of the search
              </Typography>
              <Typography variant="h6" className={classes.h6}>
                <CheckCircle className={classes.green} />
                Support 24/7
              </Typography>
            </div>
          </CardContent>
          <CardActions className={classes.containerButton}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component={Link}
              to="/sign-up/free"
            >
              Get Started
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h4">Business</Typography>
            <Typography variant="h5" style={{ textDecoration: "line-through" }}>
              $100/<Typography variant="caption">month</Typography>
            </Typography>
            <Typography variant="h5">
              $0/<Typography variant="caption">month</Typography>
            </Typography>
            <div>
              <Typography variant="h6" className={classes.h6}>
                <CheckCircle className={classes.green} />
                add 200 houses in a month
              </Typography>
              <Typography variant="h6" className={classes.h6}>
                <CheckCircle className={classes.green} /> In the first results
                of the search
              </Typography>
              <Typography variant="h6" className={classes.h6}>
                <CheckCircle className={classes.green} /> Support 24/7
              </Typography>
            </div>
          </CardContent>
          <CardActions className={classes.containerButton}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component={Link}
              to="/sign-up/business"
            >
              Get Started
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default ChooseAccount;
