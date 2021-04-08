import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import FormikField from "../common/formikField/formikField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useStyles from "./settingsStyle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import userService from "../../services/userService";
import cardService from "../../services/cards";
import { serverUrl } from "../../services/serverUrl.json";
import { useEffect, useState } from "react";
import SingleFileUploadField from "../common/uploadUserAvatar/SingleFileUploadField";

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

/////////// Formik Schema
const loginSchema = Yup.object({
  name: Yup.string()
    .min(2, `name must be longer than 2 characters`)
    .max(125, `name must be shorter than 125 characters`)
    .required(`this required`),
  contactEmail: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`),
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
      file: Yup.mixed(),
      errors: Yup.array().max(0),
    })
  )
    .min(1, ` you need to  upload one Image`)
    .max(1, `just you can upload one Image`)
    .required(`this required`),
});

/////// component
const Settings = () => {
  /////////// old image state
  const [oldImage, setOldImage] = useState({});

  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);

  /////////// Formik initialValues state
  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phone: "",
    contactEmail: "",
    image: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    /// get user info and set in  formik initialValues
    async function userInfo() {
      const { data } = await userService.getUserInfo();
      const initialValuesFromServer = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        contactEmail: "",
        image: data.image,
      };

      if (data.contactEmail) {
        initialValuesFromServer.contactEmail = data.contactEmail;
      }

      setOldImage(data.image);
      setInitialValues(initialValuesFromServer);
    }
    userInfo();
  }, []);

  //// the useStyles this  css come from  file settingsStyle
  let history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.myContainer}>
      <Typography
        variant="h2"
        className={`${classes.typography} ${classes.Shadow}`}
      >
        Settings
      </Typography>
      <Avatar
        src={oldImage.file && `${serverUrl}${oldImage.file.path}`}
        style={{ width: 70, height: 70, boxShadow: "0px 0px 10px #000" }}
      />
      <Card className={classes.card}>
        <CardContent>
          <Formik
            enableReinitialize="true"
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setFieldError }) => {
              setIsSubmited(true);
              const dataBody = {
                name: values.name,
                address: values.address,
                phone: values.phone,
                image: oldImage,
              };
              if (values.image[0].file.size) {
                let formData = new FormData();
                formData.append("avatar", values.image[0].file);
                const response = await userService.uploadimage(formData);

                if (response.data.error) {
                  setIsSubmited(false);
                  return setFieldError("image", response.data.error);
                }
                dataBody.image = response.data;
                if (response) {
                  const responseDeleteImage = await userService.deleteimage(
                    oldImage
                  );
                  if (responseDeleteImage.data.error) {
                    setIsSubmited(false);
                    return setFieldError(
                      "image",
                      responseDeleteImage.data.error
                    );
                  }
                }
              }
              if (values.contactEmail) {
                dataBody.contactEmail = values.contactEmail;
              }
              try {
                await userService.editUser(dataBody);
                const dataBodyChangeUserInfo = {
                  userName: values.name,
                  userPhone: values.phone,
                  userImage: dataBody.image,
                };
                if (values.contactEmail) {
                  dataBodyChangeUserInfo.userContactEmail = values.contactEmail;
                }
                await cardService.updateUserCardInfo(dataBodyChangeUserInfo);
                toast.success(`done successfully`);
                setIsSubmited(false);
                history.replace(`/`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  if (err.response.data.errors.name) {
                    setFieldError("name", err.response.data.errors.name);
                  }
                  if (err.response.data.errors.address) {
                    setFieldError("address", err.response.data.errors.address);
                  }
                  if (err.response.data.errors.phone) {
                    setFieldError("phone", err.response.data.errors.phone);
                  }
                  if (err.response.data.errors.image) {
                    setFieldError("image", err.response.data.errors.image);
                  }
                  if (err.response.data.errors.contactEmail) {
                    setFieldError(
                      "contactEmail",
                      err.response.data.errors.contactEmail
                    );
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
                    label="Name*"
                    error={errors.name && touched.name}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="address"
                    label="Addrss*"
                    error={errors.address && touched.address}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="phone"
                    label="Phone*"
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
                  </Box>
                  <SingleFileUploadField
                    name="image"
                    preImages={[values.image]}
                    disabled={isSubmited}
                  />

                  <Box display="flex" justifyContent="center">
                    {/* 
                    here i set errors upload images  i have to kindy of erros 
                    1:errors from react-dropzone
                    2:errors from formik validationSchema 
                    */}
                    {errors.image && (
                      <Typography color="error" style={{ marginBottom: 10 }}>
                        {typeof errors.image !== "object" && errors.image}
                      </Typography>
                    )}
                  </Box>
                  <div className={classes.buttonsContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!dirty || !isValid || isSubmited}
                    >
                      {isSubmited ? <CircularProgress /> : "Save"}
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#07c8f9" }}
                      component={Link}
                      to="/settings/password"
                      disabled={isSubmited}
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

export default Settings;
