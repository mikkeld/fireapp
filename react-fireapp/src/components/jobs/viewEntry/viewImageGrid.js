import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import ImageGrid from "../../shared/imageGrid";
import FileUploader from 'react-firebase-file-uploader';

const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
});

export const ViewImageGrid = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Pictures
      </Typography>
      <Paper className={classes.root}>
        <ImageGrid {...props}/>
        {props.isEditing &&
        <FileUploader
          accept="image/*"
          name="image"
          filename={props.filename}
          storageRef={props.firebaseStorage}
          onUploadStart={props.handleUploadStart}
          onUploadError={props.handleUploadError}
          onUploadSuccess={props.handleUploadSuccess}
          onProgress={props.handleProgress}
        />}
        {props.uploadLoading
          ? <CircularProgress/>
          : null}
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewImageGrid);
