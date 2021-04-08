/* eslint-disable no-octal-escape */
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Radio,
  InputAdornment,
  Paper,
  Chip,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import FormikField from "../common/formikField/formikField";
import { RadioGroup, Select } from "formik-material-ui";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useStyles from "./createCardStyle";
import { useState, useEffect } from "react";
import { createCard, uploadimages } from "../../services/cards";
import { getUserInfo } from "../../services/userService";
import MultipleFileUploadField from "../common/uploadCardsImages/MultipleFileUploadField";
/////////// Formik initialValues
const initialValues = {
  houseSpace: "",
  bedRooms: "",
  livingRooms: "",
  bathRooms: "",
  kitchens: "",
  floor: "",
  ParkingSpots: "",
  Description: "",
  address: "",
  images: [],
  status: "rent",
  price: "",
  city: "Jerusalem",
  propertyType: "Apartment",
};

/////////// Formik Schema
const createCardSchema = Yup.object({
  houseSpace: Yup.number()
    .min(1, `must be more of 1m`)
    .max(10000000, `must be less than  10000000m`)
    .required(`required`),
  bedRooms: Yup.number()
    .min(1, `the minimum rooms 1 `)
    .max(10000, `the maximum rooms 10000`)
    .required(`required`),
  livingRooms: Yup.number()
    .min(0, `the minimum rooms 0 `)
    .max(10000, `the maximum rooms 10000`)
    .required(`required`),
  bathRooms: Yup.number()
    .min(0, `the minimum rooms 0 `)
    .max(10000, `the maximum rooms 10000`)
    .required(`required`),
  kitchens: Yup.number()
    .min(0, `the minimum rooms 0 `)
    .max(10000, `the maximum rooms 10000`)
    .required(`required`),
  floor: Yup.number()
    .min(0, `the minimum rooms 0 `)
    .max(10000, `the maximum rooms 10000`)
    .required(`required`),
  ParkingSpots: Yup.number()
    .min(0, `the minimum ParkingSpots 0 `)
    .max(1000, `the maximum ParkingSpots 1000`)
    .required(`required`),
  Description: Yup.string()
    .min(2, `Description must be longer than 2 characters`)
    .max(1024, `Description must be shorter than 1024 characters`),
  address: Yup.string()
    .min(2, `address must be longer than 2 characters`)
    .max(400, `address must be shorter than 400 characters`)
    .required(`this required`),
  images: Yup.array(
    Yup.object({
      file: Yup.string().required(),
      errors: Yup.array().max(0),
    })
  )
    .min(1, `you must add one image at least`)
    .max(5, `images must have less than or equal to 5 images`)
    .required(`this required`),
  price: Yup.number()
    .min(1, `the minimum price 1 `)
    .max(99999999, `the maximum price 99999999`)
    .required(`required`),
  status: Yup.string().required(`required`),
  propertyType: Yup.string().min(2).max(255).required(`required`),
  city: Yup.string().min(2).max(255).required(`required`),
});

const CreateCard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  /////add new feature state
  const [newFeature, setNewFeature] = useState("");
  ///// features state
  const [featuresArray, setFeaturesArray] = useState([]);
  //// isSubmited
  const [isSubmited, setIsSubmited] = useState(false);
  //// this function handle the value from input add feature
  const handleValue = (e) => {
    setNewFeature(e.target.value);
  };
  /// this function handle add new feature
  const handleAdd = () => {
    for (let i = 0; i < featuresArray.length; i++) {
      if (featuresArray[i] === newFeature) {
        return;
      }
    }
    if (featuresArray.length >= 25) {
      return;
    }
    if (newFeature) {
      setFeaturesArray((pre) => [...pre, newFeature]);
      setNewFeature("");
    }
  };

  /// this function handle delete  feature
  const handleDelete = (featureDelete) => () => {
    setFeaturesArray((features) =>
      features.filter((feature) => feature !== featureDelete)
    );
  };

  let history = useHistory();
  //// the useStyles this  css come from  file createCardstyle
  const classes = useStyles();
  return (
    <div className={classes.myContainer}>
      <Typography
        variant="h3"
        className={`${classes.typography} ${classes.Shadow}`}
      >
        Create New Card
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={createCardSchema}
            onSubmit={async (values, { setFieldError }) => {
              const {
                propertyType,
                houseSpace,
                bedRooms,
                livingRooms,
                bathRooms,
                kitchens,
                floor,
                ParkingSpots,
                address,
                Description,
                images,
                status,
                price,
                city,
              } = values;
              setIsSubmited(true);
              let formData = new FormData();
              for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]["file"]);
              }
              const response = await uploadimages(formData);
              if (response.data.error) {
                setIsSubmited(false);
                return setFieldError("images", response.data.error);
              }

              const dataBody = {
                propertyType: propertyType,
                houseSpace: houseSpace,
                bedRooms: bedRooms,
                livingRooms: livingRooms,
                bathRooms: bathRooms,
                kitchens: kitchens,
                floor: floor,
                ParkingSpots: ParkingSpots,
                address: address,
                images: response.data.images,
                status: status,
                price: price,
                features: featuresArray,
                city: city,
                rooms: bedRooms + livingRooms + bathRooms + kitchens,
              };
              if (Description !== "") {
                dataBody.Description = Description;
              }
              const { data } = await getUserInfo();
              dataBody.userName = data.name;
              dataBody.userPhone = data.phone;
              dataBody.userImage = data.image;
              if (data.contactEmail) {
                dataBody.userContactEmail = data.contactEmail;
              }
              try {
                await createCard(dataBody);
                toast.success(`done successfully`);
                history.replace(`/`);
              } catch (err) {
                setIsSubmited(false);
                if (err.response && err.response.status === 400) {
                  if (err.response.data.errors.houseSpace) {
                    setFieldError(
                      "houseSpace",
                      err.response.data.errors.houseSpace
                    );
                  }
                  if (err.response.data.errors.bedRooms) {
                    setFieldError(
                      "bedRooms",
                      err.response.data.errors.bedRooms
                    );
                  }
                  if (err.response.data.errors.livingRooms) {
                    setFieldError(
                      "livingRooms",
                      err.response.data.errors.livingRooms
                    );
                  }
                  if (err.response.data.errors.bathRooms) {
                    setFieldError(
                      "bathRooms",
                      err.response.data.errors.bathRooms
                    );
                  }
                  if (err.response.data.errors.kitchens) {
                    setFieldError(
                      "kitchens",
                      err.response.data.errors.kitchens
                    );
                  }
                  if (err.response.data.errors.floor) {
                    setFieldError("floor", err.response.data.errors.floor);
                  }
                  if (err.response.data.errors.ParkingSpots) {
                    setFieldError(
                      "ParkingSpots",
                      err.response.data.errors.ParkingSpots
                    );
                  }
                  if (err.response.data.errors.Description) {
                    setFieldError(
                      "Description",
                      err.response.data.errors.Description
                    );
                  }
                  if (err.response.data.errors.address) {
                    setFieldError("address", err.response.data.errors.address);
                  }
                  if (err.response.data.errors.images) {
                    setFieldError("images", err.response.data.errors.images);
                  }
                  if (err.response.data.errors.price) {
                    setFieldError("price", err.response.data.errors.price);
                  }
                  if (err.response.data.errors.price) {
                    setFieldError("rooms", err.response.data.errors.rooms);
                  }
                  if (err.response.data.errors.status) {
                    setFieldError("status", err.response.data.errors.status);
                  }
                  if (err.response.data.errors.city) {
                    setFieldError("city", err.response.data.errors.city);
                  }
                  if (err.response.data.errors.propertyType) {
                    setFieldError(
                      "propertyType",
                      err.response.data.errors.propertyType
                    );
                  }
                }
              }
            }}
          >
            {({ dirty, isValid, errors, touched, values, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <FormikField
                    name="houseSpace"
                    label="House Space*"
                    variant="outlined"
                    type="number"
                    error={errors.houseSpace && touched.houseSpace}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">M</InputAdornment>
                      ),
                    }}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="bedRooms"
                    label="bedRooms*"
                    type="number"
                    variant="outlined"
                    error={errors.bedRooms && touched.bedRooms}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="livingRooms"
                    label="living Rooms*"
                    type="number"
                    variant="outlined"
                    error={errors.livingRooms && touched.livingRooms}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="bathRooms"
                    label="Bath Rooms*"
                    type="number"
                    variant="outlined"
                    error={errors.bathRooms && touched.bathRooms}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="kitchens"
                    label="kitchens*"
                    type="number"
                    variant="outlined"
                    error={errors.kitchens && touched.kitchens}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="floor"
                    label="floor*"
                    type="number"
                    variant="outlined"
                    error={errors.floor && touched.floor}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="ParkingSpots"
                    label="Parking Spots*"
                    type="number"
                    variant="outlined"
                    error={errors.ParkingSpots && touched.ParkingSpots}
                    disabled={isSubmited}
                  />
                  <FormikField
                    name="Description"
                    label="Description"
                    variant="outlined"
                    error={errors.Description && touched.Description}
                    disabled={isSubmited}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="h5">upload card images*</Typography>
                    <Typography variant="h6">
                      min 1 image max 5 images
                    </Typography>
                    <Typography variant="h6">
                      {values.images.length <= 5 ? (
                        <Typography>({values.images.length + "/5"})</Typography>
                      ) : (
                        <Typography color="error">
                          ({values.images.length + "/5"})
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                  <MultipleFileUploadField
                    name="images"
                    disabled={isSubmited}
                  />
                  <Box display="flex" justifyContent="center">
                    {/* 
                    here i set errors upload images  i have to kindy of erros 
                    1:errors from react-dropzone
                    2:errors from formik validationSchema 
                    */}
                    {errors.images && values.images.length >= 1 && (
                      <Typography color="error" style={{ marginBottom: 10 }}>
                        {typeof errors.images !== "object" && errors.images}
                      </Typography>
                    )}
                  </Box>

                  <div className={classes.addFeatureContainer}>
                    <FormikField
                      name="addFeature"
                      label="Add Feature"
                      variant="outlined"
                      className={classes.addFeatureInput}
                      error={errors.addFeature && touched.addFeature}
                      onInput={handleValue}
                      value={newFeature}
                      disabled={isSubmited}
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.addFeatureButton}
                      onClick={handleAdd}
                      disabled={
                        featuresArray.length >= 25 ? true : false || isSubmited
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <Box display="flex" justifyContent="center">
                    ({featuresArray.length}/25)
                  </Box>
                  <Paper component="ul" className={classes.featuresContainer}>
                    {featuresArray.length ? (
                      featuresArray.map((feature) => {
                        return (
                          <li key={feature} style={{ listStyle: "none" }}>
                            <Chip
                              label={feature}
                              onDelete={handleDelete(feature)}
                              className={classes.feature}
                            />
                          </li>
                        );
                      })
                    ) : (
                      <Chip
                        label="No features add some features"
                        className={classes.feature}
                      />
                    )}
                  </Paper>
                  <FormikField
                    name="address"
                    label="address*"
                    variant="outlined"
                    error={errors.address && touched.address}
                    disabled={isSubmited}
                  />
                  <FormControl style={{ marginBottom: 20, width: "100%" }}>
                    <InputLabel>City</InputLabel>
                    <Field component={Select} name="city" disabled={isSubmited}>
                      <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                      <MenuItem value="Netanya">Netanya</MenuItem>
                      <MenuItem value="Haifa">Haifa</MenuItem>
                      <MenuItem value="Tel Aviv">Tel Aviv</MenuItem>
                    </Field>
                  </FormControl>
                  <FormControl style={{ marginBottom: 20, width: "100%" }}>
                    <InputLabel>PropertyType</InputLabel>
                    <Field
                      component={Select}
                      name="propertyType"
                      disabled={isSubmited}
                    >
                      <MenuItem value="Apartment">Apartment</MenuItem>
                      <MenuItem value="Cottage/house">Cottage/house</MenuItem>
                      <MenuItem value="Duptex">Duptex</MenuItem>
                      <MenuItem value="Garden apt">Garden apt</MenuItem>
                      <MenuItem value="Loft">Loft</MenuItem>
                      <MenuItem value="Villa">Villa</MenuItem>
                      <MenuItem value="Triplex">Triplex</MenuItem>
                      <MenuItem value="penthouse">penthouse</MenuItem>
                    </Field>
                  </FormControl>
                  <FormikField
                    name="price"
                    label="price*"
                    type="number"
                    variant="outlined"
                    error={errors.price && touched.price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">₪</InputAdornment>
                      ),
                    }}
                    disabled={isSubmited}
                  />
                  <Field
                    component={RadioGroup}
                    name="status"
                    className={classes.containerRadio}
                  >
                    <FormControlLabel
                      value="rent"
                      control={<Radio />}
                      label="Rent"
                      disabled={isSubmited}
                    />
                    <FormControlLabel
                      value="sale"
                      control={<Radio />}
                      label="sale"
                      disabled={isSubmited}
                    />
                  </Field>
                  <div className={classes.containerButton}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      disabled={!dirty || !isValid || isSubmited}
                    >
                      {isSubmited ? <CircularProgress /> : "Create"}
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      component={Link}
                      className={classes.button}
                      to="/"
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

export default CreateCard;
