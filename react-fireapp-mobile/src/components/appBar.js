import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import deepOrange from 'material-ui/colors/deepOrange';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import { Link } from 'react-router-dom';
import {logout} from "../utils/authService";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
});


const FireAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.route &&
            <Link to={{ pathname: props.route }} style={{textDecoration: 'none'}}>
              <IconButton className={classes.menuButton} color="contrast">
                <ArrowBackIcon/>
              </IconButton>
            </Link>}
          <Typography type="title" color="inherit" className={classes.flex}>
            {props.title || ''}
          </Typography>
          {props.rightIcon
            ? props.rightIcon
            : <Button color="contrast" onClick={logout}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};


export default withStyles(styles)(FireAppBar);