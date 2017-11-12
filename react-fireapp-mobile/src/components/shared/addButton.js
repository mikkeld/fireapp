import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import {
  Link
} from 'react-router-dom';
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
    <Link to={{ pathname: `/createEntry/${props.jobKey}` }}>
      <Tooltip id="add-button" title="Create Entry" placement="top">
        <Button fab color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
      </Tooltip>
    </Link>
  );
};

export default withStyles(styles)(AddButton)