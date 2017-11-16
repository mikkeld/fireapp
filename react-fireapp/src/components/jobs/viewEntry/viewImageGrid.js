import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import ImageGrid from "../../shared/imageGrid";

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
        {props.isEditing && <input type="file" id="myFile" onChange={props.handleFileUpload} />}
        {props.uploadLoading
          ? <CircularProgress/>
          : null}
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewImageGrid);
