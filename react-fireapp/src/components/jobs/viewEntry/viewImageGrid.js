import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import ImageGrid from "../../shared/imageGrid";
import {FirebaseUploader} from "../../../utils/firebaseUploader";
import PropTypes from 'prop-types';

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
        {props.isEditing && <FirebaseUploader onFileUploadSuccess={props.onFileUploadSuccess}/>}
      </Paper>
    </div>
  )
};

ViewImageGrid.propTypes = {
  ...ImageGrid.propTypes,
  isEditing: PropTypes.bool,
  onFileUploadSuccess: PropTypes.func
};

export default withStyles(styles)(ViewImageGrid);
