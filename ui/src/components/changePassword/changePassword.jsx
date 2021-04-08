import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import FormikField from "../common/formikField/formikField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useStyles from "./changePasswordStyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../../services/userService";
import { useEffect } from "react";
/////////// Formik initialValues
const initialValues = {
  password: "",
  newPassword: "",
  passwordConfirm: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

/////////// Formik Schema

const loginSchema = Yup.object({
  password: Yup.string()
    .max(1024, `password must be shorter than 1024 characters`)
    .required(),
  newPassword: Yup.string()
    .matches(lowerCaseRegExp, `one lowerCase Required!`)
    .matches(upperCaseRegExp, `one upperCase Required!`)
    .matches(numericRegExp, `one number Required!`)
    .min(6, `password must be longer than 8 characters`)
    .max(1024, `password must be shorter than 1024 characters`)
    .required(`this required`),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword")], `Password must be the same!`)
    .required(`this required`),
});

/////// component
const ChangePassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let history = useHistory();
  //// the useStyles this  css come from  file changePasswordStyle
  const classes = useStyles();

  return (
    <div className={classes.myContainer}>
      <Typography variant="h3" className={classes.typography}>
        Change Password
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setFieldError }) => {
              const { password, newPassword } = values;
              const dataBody = {
                password: password,
                newPassword: newPassword,
              };
              try {
                await userService.changePassword(dataBody);
                toast(`change password successfully`);
                history.replace(`/`);
              } catch (err) {
                if (err.response && err.response.status === 400) {
                  if (err.response.data.errors.password) {
                    setFieldError(
                      "password",
                      err.response.data.errors.password
                    );
                  }
                  if (err.response.data.errors.newPassword) {
                    setFieldError(
                      "newPassword",
                      err.response.data.errors.newPassword
                    );
                    setFieldError(
                      "passwordConfirm",
                      err.response.data.errors.newPassword
                    );
                  }
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <FormikField
                    name="password"
                    label="password*"
                    type="password"
                    error={errors.password && touched.password}
                  />
                  <FormikField
                    name="newPassword"
                    label="New Password*"
                    type="password"
                    error={errors.newPassword && touched.newPassword}
                  />
                  <FormikField
                    name="passwordConfirm"
                    label="confirm  New Password*"
                    type="password"
                    error={errors.passwordConfirm && touched.passwordConfirm}
                  />
                  <div className={classes.containerButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={Link}
                      to="."
                      className={classes.button}
                      style={{ marginRight: 20 }}
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      disabled={!dirty || !isValid}
                    >
                      Change Password
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

export default ChangePassword;
