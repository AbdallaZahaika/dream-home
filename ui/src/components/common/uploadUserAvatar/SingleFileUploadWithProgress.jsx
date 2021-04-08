import { Grid, LinearProgress } from "@material-ui/core";
import { FileHeader } from "./FileHeader";

export function SingleFileUploadWithProgress({ file, onDelete, disabled }) {
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} disabled={disabled} />
      <LinearProgress variant="determinate" value={100} />
    </Grid>
  );
}
