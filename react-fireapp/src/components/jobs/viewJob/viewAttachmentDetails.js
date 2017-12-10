import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  },
  chipContainer: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const ViewAttachmentDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Attachments for job
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.chipContainer}>
          {props.currentJob.selectedUploads.map(file => {
            return (
              <Chip
                onClick={() => props.handleDialogShow(file)}
                className={classes.chip}
                avatar={
                  <Avatar>
                    <ContentCopyIcon />
                  </Avatar>
                }
                label={file.name}
                key={file.name}
              />
            )
          })}
        </div>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewAttachmentDetails);
