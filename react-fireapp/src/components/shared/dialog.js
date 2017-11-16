import React  from 'react';
import Dialog from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';


const styles = theme => ({
  container: {
    marginRight: theme.spacing.unit*2
  },
  contentStyle: {
    width: '90%',
    height: '90%'
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  }
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export const BasicDialog = (props) => {
  const { classes } = props;
  return (
    <Dialog open={props.open} onRequestClose={props.handleRequestClose} fullScreen={props.fullScreen}>
      {props.fullScreen &&
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="contrast" onClick={() => props.handleRequestClose()} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>}
      <div>
        {props.children}
      </div>
    </Dialog>
  )
};

export default withStyles(styles)(BasicDialog);