/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';

import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import BusinessIcon from 'material-ui-icons/Business';
import EventIcon from 'material-ui-icons/Event';
import DashboardIcon from 'material-ui-icons/Dashboard';
import {
  Link,
  NavLink
} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  subLink: {
    textDecoration: 'none'
  },
  text: {
    color: theme.palette.primary.A400,
    fontWeight: 'bold'
  },
  flex: {
    flex: 1,
  },

});

const CustomNavLink = (props) => (
  <NavLink  className={props.classes.subLink} to={{ pathname: props.to }}>
    <ListItem button className={props.classes.nested}>
      <ListItemText classes={props.pathname === props.to ? {text: props.classes.text} : null}
                    inset
                    primary={props.displayName} />
    </ListItem>
  </NavLink>
);

class ResponsiveDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      adminOpen: true,
      jobsOpen: false,
      reportsOpen: false,
      activePath: "/admin"
    };
  }

  handleClick = state => {
    if(state === "admin") {
      this.setState({adminOpen: !this.state.adminOpen})
    } else if (state === "jobs") {
      this.setState({jobsOpen: !this.state.jobsOpen})
    } else if (state === "reports") {
      this.setState({reportsOpen: !this.state.reportsOpen})
    } else {
      console.log("unknown link group")
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
        </div>
        <Divider />
        <List className={classes.root}>
          <ListItem button onClick={() => this.handleClick("admin")}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText inset primary="Admin" />
            {this.state.adminOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.adminOpen} transitionDuration="auto" unmountOnExit>
            <CustomNavLink to="/admin/users"
                           classes={classes}
                           pathname={this.props.location.pathname}
                           displayName="Users" />
            <CustomNavLink to="/admin/companies"
                           classes={classes}
                           pathname={this.props.location.pathname}
                           displayName="Companies" />
            <CustomNavLink to="/admin/products"
                           classes={classes}
                           pathname={this.props.location.pathname}
                           displayName="Products" />
          </Collapse>
          <Link className={classes.subLink} to={{ pathname: "/jobs" }}>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText classes={this.props.location.pathname === "/jobs" ? {text: classes.text} : null} inset primary="Jobs" />
            </ListItem>
          </Link>
          <ListItem button onClick={() => this.handleClick("reports")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText inset primary="Reports" />
            {this.state.reportsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.reportsOpen} transitionDuration="auto" unmountOnExit>
            <CustomNavLink to="/reports"
                           classes={classes}
                           pathname={this.props.location.pathname}
                           displayName="Job Reports" />
            <CustomNavLink to="/reports/activity"
                           classes={classes}
                           pathname={this.props.location.pathname}
                           displayName="Activity Reports" />
          </Collapse>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap className={classes.flex}>
                {this.props.componentTitle}
              </Typography>
              {this.props.user ?
                <Button color="contrast" onClick={this.props.handleLogout}>Logout</Button>
                :
                <Button color="contrast" onClick={this.props.handleLogin}>Login</Button>
              }

            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Typography type="body1" noWrap>
            </Typography>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);