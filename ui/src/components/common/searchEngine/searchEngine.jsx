import { Form, Formik, Field } from "formik";
import {
  IconButton,
  InputBase,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Collapse,
} from "@material-ui/core";
import { Settings, Search } from "@material-ui/icons";
import * as Yup from "yup";
import useStyle from "./searchEngineStyle";
import FormikField from "../formikField/formikField";
import { useState } from "react";

/////////// Formik validationSchema
const validationSchema = Yup.object({
  searchInput: Yup.string(),
  status: Yup.string(),
  city: Yup.string(),
  PropertyType: Yup.string(),
  rooms: Yup.number(),
  minPrice: Yup.number(),
  maxPrice: Yup.number(),
  bedRooms: Yup.number(),
});

/////// component
const FilterBar = ({ searchValue, status }) => {
  /// this state handle value if Advanced show or hide
  const [isVisible, setIsVisible] = useState(false);

  /////////// Formik initialValues
  const initialValues = {
    searchInput: "",
    status: status,
    city: "all",
    rooms: "",
    PropertyType: "all",
    minPrice: "",
    maxPrice: "",
    bedRooms: "",
  };

  const handleShowAdvanced = () => {
    setIsVisible(!isVisible);
  };
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.city === "all") {
            values.city = "";
          }
          if (values.PropertyType === "all") {
            values.PropertyType = "";
          }
          if (values.status === "all") {
            values.status = "";
          }
          searchValue(values);
        }}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} className={classes.form}>
              <Grid container justify="center" alignItems="center">
                <Grid
                  item
                  xs="auto"
                  sm="auto"
                  lg="auto"
                  className={classes.containerInputSearch}
                >
                  <Field
                    as={InputBase}
                    placeholder="address,city"
                    className={classes.inputSearch}
                    name="searchInput"
                    error={errors.searchInput && touched.searchInput}
                    autoComplete="off"
                  />
                  <IconButton type="submit" aria-label="search">
                    <Search />
                  </IconButton>
                </Grid>
                <Grid item xs={4} sm="auto" lg="auto">
                  <FormControl className={classes.formControl}>
                    <InputLabel style={{ color: "#fff" }}>Status</InputLabel>
                    <Field as={Select} name="status" style={{ color: "#fff" }}>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="rent">Rent</MenuItem>
                      <MenuItem value="sale">Sale</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs="auto" sm="auto" lg="auto">
                  <Button variant="contained" color="primary" type="submit">
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 20 }}
                    onClick={handleShowAdvanced}
                  >
                    <Settings /> Advanced
                  </Button>
                </Grid>
              </Grid>
              <Collapse in={isVisible} className={classes.containerAdvanced}>
                <FormControl className={classes.formControl}>
                  <InputLabel>city</InputLabel>
                  <Field as={Select} name="city">
                    <MenuItem value="all">all</MenuItem>
                    <MenuItem value="Jerusalem">Jerusalem</MenuItem>
                    <MenuItem value="Netanya">Netanya</MenuItem>
                    <MenuItem value="Haifa">Haifa</MenuItem>
                    <MenuItem value="Tel Aviv">Tel Aviv</MenuItem>
                  </Field>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>PropertyType</InputLabel>
                  <Field as={Select} name="PropertyType">
                    <MenuItem value="all">all</MenuItem>
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
                <FormControl className={classes.formControl}>
                  <InputLabel>rooms</InputLabel>
                  <Field as={Select} name="rooms">
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5+</MenuItem>
                  </Field>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>bedRooms</InputLabel>
                  <Field as={Select} name="bedRooms">
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5+</MenuItem>
                  </Field>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <FormikField
                    name="minPrice"
                    label="Min Price"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">₪</InputAdornment>
                      ),
                    }}
                    error={errors.minPrice && errors.minPrice}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <FormikField
                    name="maxPrice"
                    label="Max Price"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">₪</InputAdornment>
                      ),
                    }}
                    error={errors.maxPrice && touched.maxPrice}
                  />
                </FormControl>
              </Collapse>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FilterBar;
