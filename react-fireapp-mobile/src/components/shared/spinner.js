import React  from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  spinner: {
    position: 'absolute',
    height: 50,
    width: 50,
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    backgroundSize: '100%'
  }
});

const Spinner = (props) => {
  const {classes} = props;
  return (
    <CircularProgress className={classes.spinner} size={50} />
  );
};

export default withStyles(styles)(Spinner)