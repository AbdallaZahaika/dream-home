/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Grid, makeStyles, Box } from "@material-ui/core";
import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploadError";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: "none",
  },
}));

const MultipleFileUploadField = ({ name, preImages, disabled }) => {
  const [_, __, helpers] = useField(name);
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (preImages && preImages.length) {
      setFiles(preImages);
    }
  }, [preImages]);

  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
  }, [files]);

  function onUpload(file, url) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/psd"],
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <Box mt={2} mb={2}>
      <Grid item style={{ marginBottom: 6 }}>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} disabled={disabled ? disabled : false} />
          <p>Drag 'n' drop some images here, or click to select images</p>
        </div>
      </Grid>

      {files.map((fileWrapper, idx) => (
        <Grid item key={idx}>
          {fileWrapper.errors && fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
              disabled={disabled ? disabled : false}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              disabled={disabled ? disabled : false}
              file={fileWrapper.file}
            />
          )}
        </Grid>
      ))}
    </Box>
  );
};

export default MultipleFileUploadField;
