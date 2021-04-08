import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { SyncAlt } from "@material-ui/icons";
import { Form, Formik } from "formik";
import FormikField from "../common/formikField/formikField";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import useStyles from "./loginstyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../../services/userService";
import { connect } from "react-redux";
import { setUser } from "../../store/user/userActions";
import { useEffect, useState } from "react";
/////////// Formik initialValues
const initialValues = {
  email: "",
  password: "",
};

/////////// Formik Schema
const loginSchema = Yup.object({
  email: Yup.string().required(`this required`),
  password: Yup.string().required(`this required`),
});

/////// component
const Login = ({ setUser }) => {
  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //// the useStyles this  css come from  file NAstyle
  let history = useHistory();
  const classes = useStyles();
  /// this if check if the user logged
  /// if true Redirect to /
  if (userService.getCurrentUser()) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.myContainer}>
      <Typography
        variant="h2"
        className={`${classes.typography} ${classes.Shadow}`}
      >
        Log in Dream <SyncAlt fontSize="large" />
        Home
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setFieldError }) => {
              try {
                setIsSubmited(true);
                await userService.login(values.email, values.password);
                setUser(true);
                localStorage.setItem("user", true);
                toast.success(`you login`);
                history.replace(`/`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  setFieldError("email", err.response.data.error);
                  setFieldError("password", err.response.data.error);
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <FormikField
                    name="email"
                    label="Email*"
                    error={errors.email && touched.email}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="password"
                    label="Password*"
                    type="password"
                    error={errors.password && touched.password}
                    disabled={isSubmited}
                  />
                  <div className={classes.containerTypography}>
                    <Typography
                      variant="body2"
                      color="primary"
                      component={Link}
                      to="/sign-up"
                      disabled={isSubmited}
                    >
                      Create New Account
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      component={Link}
                      to="/forgotPassword"
                      disabled={isSubmited}
                    >
                      Forgot password?
                    </Typography>
                  </div>
                  <div className={classes.containerButton}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      disabled={!dirty || !isValid || isSubmited}
                    >
                      {isSubmited ? <CircularProgress /> : "Log in"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
//// this function get the user state form the stor
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
//// this function chagen the user state
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
