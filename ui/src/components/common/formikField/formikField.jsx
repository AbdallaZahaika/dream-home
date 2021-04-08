import { ErrorMessage, Field } from "formik";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
  },
});

/// this is the field will be used in  all component need form
const FormikField = ({ name, label, type = "text", ...rest }) => {
  const classes = useStyles();
  return (
    <Field
      className={classes.field}
      {...rest}
      autoComplete="off"
      as={TextField}
      helperText={<ErrorMessage name={name} />}
      fullWidth
      label={label}
      name={name}
      type={type}
    />
  );
};

export default FormikField;
