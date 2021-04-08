import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import FormikField from "../../common/formikField/formikField";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { CheckboxWithLabel } from "formik-material-ui";
import * as Yup from "yup";
import useStyles from "./BAstyle";
import { toast } from "react-toastify";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../../services/http";
import { getCurrentUser, uploadimage } from "../../../services/userService";
import SingleFileUploadField from "../../common/uploadUserAvatar/SingleFileUploadField";

/////////// Formik initialValues
const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phone: "",
  address: "",
  image: "",
  policy: false,
  contactEmail: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

/////////// Formik Schema

const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, `company name must be longer than 2 characters`)
    .max(255, `company  name must be shorter than 255 characters`)
    .required(`this required`),

  email: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`)
    .required(`this required`),

  contactEmail: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`),
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

  phone: Yup.string()
    .min(9, `Phone must be longer than 9 characters`)
    .max(10, `Phone must be shorter than 10 characters`)
    .matches(phoneRegExp, `Phone number is not valid`)
    .required(`this required`),

  address: Yup.string()
    .min(2, `Address must be longer than 2 characters`)
    .max(400, `Address must be shorter than 400 characters`)
    .required(`this required`),

  image: Yup.array(
    Yup.object({
      file: Yup.string().required(),
      errors: Yup.array().max(0),
    })
  ).max(1, `you can upload one image only`),
  policy: Yup.bool().oneOf([true], `you must accept the policy`),
});

const BusinessAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);

  //// the useStyles this  css come from  file BAstyle
  let history = useHistory();
  const classes = useStyles();
  /// this if check if the user logged
  /// if true Redirect to /
  if (getCurrentUser()) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.myContainer}>
      <Typography
        variant="h2"
        className={`${classes.typography} ${classes.Shadow}`}
      >
        Sign Up For Dream <SyncAltIcon fontSize="large" />
        Home
      </Typography>
      <Typography variant="h5" className={classes.typography}>
        You can open a Business Account for free
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={async (values, { setFieldError }) => {
              setIsSubmited(true);
              const {
                image,
                policy,
                passwordConfirm,
                contactEmail,
                ...data
              } = values;
              data.biz = true;
              if (image.length) {
                let formData = new FormData();
                formData.append("avatar", image[0]["file"]);
                const response = await uploadimage(formData);
                if (response.data.error) {
                  setIsSubmited(false);
                  return setFieldError("image", response.data.error);
                }
                data.image = response.data;
              }
              if (contactEmail) {
                data.contactEmail = contactEmail;
              }
              try {
                await http.post(`/users`, data);
                toast(`Now you can never not be our user`);
                history.replace(`/login`);
              } catch (err) {
                setIsSubmited(false);

                if (err.response && err.response.status === 400) {
                  if (err.response.data.errors.name) {
                    setFieldError("name", err.response.data.errors.name);
                  }
                  if (err.response.data.errors.email) {
                    setFieldError("email", err.response.data.errors.email);
                  }
                  if (err.response.data.errors.password) {
                    setFieldError(
                      "password",
                      err.response.data.errors.password
                    );
                  }
                  if (err.response.data.errors.phone) {
                    setFieldError("phone", err.response.data.errors.phone);
                  }
                  if (err.response.data.errors.address) {
                    setFieldError("address", err.response.data.errors.address);
                  }
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit, values }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <FormikField
                    name="name"
                    label="Company Name*"
                    error={errors.name && touched.name}
                    disabled={isSubmited}
                  />
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
                  <FormikField
                    name="passwordConfirm"
                    type="password"
                    label="Confirm Password*"
                    error={errors.passwordConfirm && touched.passwordConfirm}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="address"
                    label="Address*"
                    error={errors.address && touched.address}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="phone"
                    label="Contact Phone*"
                    error={errors.phone && touched.phone}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="contactEmail"
                    label="Contact Email"
                    error={errors.contactEmail && touched.contactEmail}
                    disabled={isSubmited}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="h5">upload user image</Typography>
                    <Typography variant="h6">
                      you can upload one image
                    </Typography>
                    <Typography variant="h6">
                      {values.image.length <= 1 ? (
                        <Typography>({values.image.length + "/1"})</Typography>
                      ) : (
                        <Typography color="error">
                          ({values.image.length + "/1"})
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                  <SingleFileUploadField name="image" disabled={isSubmited} />
                  <Box display="flex" justifyContent="center">
                    {errors.image && (
                      <Typography color="error" style={{ marginBottom: 10 }}>
                        {typeof errors.image !== "object" && errors.image}
                      </Typography>
                    )}
                  </Box>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="policy"
                    Label={{ label: `accept the policy` }}
                    error={errors.policy && touched.policy}
                    disabled={isSubmited}
                  />
                  <div className={classes.containerButton}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!dirty || !isValid || isSubmited}
                    >
                      {isSubmited ? <CircularProgress /> : "Sign Up"}
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      component={Link}
                      className={classes.button}
                      to="."
                      disabled={isSubmited}
                    >
                      Cancel
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

export default BusinessAccount;
