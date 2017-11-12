import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import PlaceIcon from 'material-ui-icons/Place';
import Tooltip from 'material-ui/Tooltip';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  textHeader: {
    display: 'block',
    color: 'grey',
    fontSize: '70%'
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
  inline: {
    float: 'left',
    paddingRight: theme.spacing.unit*2,
  },
  clearBoth: {
    clear: 'both',
    marginBottom: theme.spacing.unit*2,
  },
  fab: {
    margin: theme.spacing.unit * 2,
  },
});

const LocationDescriptionTextField = (props) => (
  <TextField
    id="locationDescription"
    label="Location Description"
    multiline
    rows="4"
    value={props.locationDescription}
    onChange={props.handleInputChange('locationDescription')}
    margin="normal"
    fullWidth
  />
);

const CommentsTextField = (props) => (
  <TextField
    id="comments"
    label="Comments"
    multiline
    rows="4"
    value={props.comments}
    onChange={props.handleInputChange('comments')}
    margin="normal"
    fullWidth
  />
);


export const ViewEntryDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Entry details
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Tag ID</span>
          <span>TBU</span>
        </div>
        <div className={classes.wrapper}>
          <span className={classes.textHeader}>Tag location</span>
          <Tooltip id="tooltip-icon" title="View Pins" placement="bottom">
            <IconButton onClick={() => props.handleMarkedImageClickOpen()}>
              <PlaceIcon />
            </IconButton>
          </Tooltip>
          {props.isEditing && <Button color="primary" onClick={() => props.handleMarkedImageClickOpen()}>Edit pinned location</Button>}
        </div>
        {props.isEditing
          ? <LocationDescriptionTextField {...props} />
          : <div className={classes.inline}>
              <span className={classes.textHeader}>Tag location description</span>
              <span>{props.locationDescription}</span>
            </div>}

        {props.isEditing
          ? <CommentsTextField {...props} />
          : <div className={classes.inline}>
              <span className={classes.textHeader}>Work entry comments</span>
              <span>{props.comments}</span>
            </div>}
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewEntryDetails);
