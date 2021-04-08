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
import useStyles from "./resetPasswordStyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../../services/userService";
import { useEffect, useState } from "react";

/////////// Formik initialValues
const initialValues = {
  password: "",
  passwordConfirm: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

/////////// Formik Schema
const schema = Yup.object({
  password: Yup.string()
    .matches(lowerCaseRegExp, `one lowerCase Required!`)
    .matches(upperCaseRegExp, `one upperCase Required!`)
    .matches(numericRegExp, `one number Required!`)
    .min(6, `password must be longer than 8 characters`)
    .max(1024, `password must be shorter than 1024 characters`)
    .required(`this required`),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], `Password must be the same!`)
    .required(`this required`),
});

const ResetPassword = (props) => {
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
        Change your password
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { setFieldError }) => {
              try {
                setIsSubmited(true);
                await userService.resetPassword(
                  props.match.params.resetToken,
                  values.password
                );
                toast.success(`password changed`);
                history.replace(`/login`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  setFieldError("password", err.response.data.error);
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <FormikField
                    placeholder="Enter 8 characters."
                    name="password"
                    label="New Password*"
                    type="password"
                    error={errors.password && touched.password}
                    disabled={isSubmited}
                  />
                  <FormikField
                    placeholder="Enter 8 characters."
                    name="passwordConfirm"
                    type="password"
                    label="Confirm Password*"
                    error={errors.passwordConfirm && touched.passwordConfirm}
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

export default ResetPassword;
