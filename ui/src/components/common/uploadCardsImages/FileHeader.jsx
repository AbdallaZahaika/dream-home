import { Button, Grid } from "@material-ui/core";

export function FileHeader({ file, onDelete, disabled }) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>{file.name}</Grid>
      <Grid item>
        <Button
          size="small"
          color="secondary"
          onClick={() => onDelete(file)}
          disabled={disabled ? disabled : false}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
