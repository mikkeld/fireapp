import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit*2,
    right: theme.spacing.unit*2,
    zIndex: 0
  }
});

const AddButton = (props) => {
  const {classes} = props;
  return (
    <Tooltip id="add-button" title={props.tooltip} placement="top">
      <Button fab color="primary" aria-label="add" className={classes.button} onClick={props.handleClick}>
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

export default withStyles(styles)(AddButton)