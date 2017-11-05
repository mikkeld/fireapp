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
  }
});

export const ViewAttachmentDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Attachments for job
      </Typography>
      <Paper className={classes.root}>
        {props.currentJob.selectedUploads.map(file => {
          // When this is clicked, should open dialog with image in large. This dialog should have a download option
          return (
            <Chip
              onClick={() => props.handleClickOpen(file)}
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
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewAttachmentDetails);
