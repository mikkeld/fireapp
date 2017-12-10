import React  from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';

const styles = theme => ({
  actions: {
    marginBottom: theme.spacing.unit*2
  }
});

export const EntryActions = props => {
  const { classes } = props;
  return (
    props.isEditing
      ? <div className={classes.actions}>
          <Button raised color="primary" onClick={props.handleEdit} style={{marginRight: 5}}>Save edits</Button>
          <Button color="primary" onClick={() => props.toggleEdit(true)}>Cancel</Button>
        </div>
      : <div>
          <Link to={{pathname: `/jobs/${props.jobId}`}} style={{textDecoration: 'none'}}>
            <IconButton color="primary">
              <ArrowBackIcon/>
            </IconButton>
          </Link>
          <Button style={{float: 'right'}} color="primary" onClick={props.toggleEdit}>Edit entry</Button>
        </div>
  )
};

EntryActions.propTypes = {
  isEditing: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  jobId: PropTypes.string.isRequired
};

export default withStyles(styles)(EntryActions);
