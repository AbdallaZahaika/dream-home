import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import FormikField from "../common/formikField/formikField";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import useStyles from "./forgotPasswordStyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../../services/userService";
import { useEffect, useState } from "react";

/////////// Formik initialValues
const initialValues = {
  email: "",
};

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

/////////// Formik Schema
const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`)
    .required(`this required`),
});

const ForgotPassword = () => {
  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        Forgot Password
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordSchema}
            onSubmit={async (values, { setFieldError }) => {
              try {
                setIsSubmited(true);
                await userService.forgotPasswrod(values.email);
                toast.success(`check your email`);
                history.replace(`/login`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  setFieldError("email", err.response.data.error);
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Typography variant="body1">Enter your email</Typography>
                  <FormikField
                    name="email"
                    label="Email*"
                    error={errors.email && touched.email}
                    disabled={isSubmited}
                  />
                  <div className={classes.containerButton}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      disabled={!dirty || !isValid || isSubmited}
                    >
                      {isSubmited ? <CircularProgress /> : "Next"}
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

export default ForgotPassword;
