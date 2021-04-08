import {
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@material-ui/core";

import { toast } from "react-toastify";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikField from "../common/formikField/formikField";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import useStyles from "./contactUsStyle";
import sendEmail from "../../services/contactUsService";
/////////// Formik initialValues
const initialValues = {
  email: "",
  message: "",
  subject: "",
};

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

/////////// Formik Schema
const contactUsSchema = Yup.object({
  email: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`)
    .required(`this required`),
  subject: Yup.string()
    .min(2, `Subject must be longer than 2 characters`)
    .max(125, `Subject must be shorter than 125 characters`)
    .required(`this required`),
  message: Yup.string()
    .min(2, `message must be longer than 2 characters`)
    .max(1025, `message must be shorter than 1025 characters`)
    .required(`this required`),
});

const ContactUs = () => {
  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.myContainer}>
      <Typography
        variant="h2"
        className={`${classes.typography} ${classes.Shadow}`}
      >
        Contact Us
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1">
            Got a question? We'd love to hear from you. Send us a message
          </Typography>

          <Typography variant="body1" style={{ textAlign: "center" }}>
            and we'll respond as soon as possible
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={contactUsSchema}
            onSubmit={async (values, { setFieldError }) => {
              try {
                setIsSubmited(true);
                const { message, subject, email } = values;
                const dataBody = { message, subject, email };
                await sendEmail(dataBody);
                toast.success(`email sent`);
                history.push(`/`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  if (err.response.data.error) {
                    setFieldError("email", err.response.data.error);
                  }
                  if (err.response.data.errors.email) {
                    setFieldError("email", err.response.data.errors.email);
                  }
                  if (err.response.data.errors.subject) {
                    setFieldError("subject", err.response.data.errors.subject);
                  }
                  if (err.response.data.errors.message) {
                    setFieldError("message", err.response.data.errors.message);
                  }
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormikField
                  name="email"
                  label="Email*"
                  error={errors.email && touched.email}
                  disabled={isSubmited}
                />
                <FormikField
                  name="subject"
                  label="Subject*"
                  error={errors.subject && touched.subject}
                  disabled={isSubmited}
                />
                <label
                  htmlFor="message"
                  style={{
                    color: errors.message && touched.message ? "red" : "black",
                  }}
                >
                  Message*
                </label>
                <Field
                  component="textarea"
                  name="message"
                  className={classes.textarea}
                  disabled={isSubmited}
                />
                <ErrorMessage name="message">
                  {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                </ErrorMessage>
                <div className={classes.containerButton}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    disabled={!dirty || !isValid || isSubmited}
                  >
                    {isSubmited ? <CircularProgress /> : "Send"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
