import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import ResetEmailDialog from "../../components/auth/resetEmailDialog";
import {firebaseAuth} from "../../utils/firebase/firebase";
import SimpleSnackbar from '../../components/shared/snackbar';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import {FirebaseList} from "../../utils/firebase/firebaseList";
import {snapshotToArray} from "../../utils/utils";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    position: 'relative',
    top: '50%',
    left: '50%',
    marginLeft: '-150px',
  },
  container: {
    width: 300,
    position: 'relative'
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
  actions: {
    marginTop: theme.spacing.unit * 2,
  }
});


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      resetEmailField: '',
      showSnackbar: false,
      snackbarMsg: '',
      open: false,
      loading: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openResetEmailForm = this.openResetEmailForm.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleResetEmail = this.handleResetEmail.bind(this);
    this.handleSnackbarShow = this.handleSnackbarShow.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.outputLoginError = this.outputLoginError.bind(this);

    this.firebase = new FirebaseList('users');
  }

  handleLogin() {
    this.setState({loading: true});
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      this.outputLoginError("Incorrect password")
    });
  }

  outputLoginError(msg) {
    this.setState({loading: false});
    this.handleSnackbarShow(msg)
  }

  handleInputChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  };

  handleRequestClose() {
    this.setState({open: false})
  }

  openResetEmailForm() {
    this.setState({open: true})
  }

  handleResetEmail() {
    this.handleRequestClose();
    firebaseAuth.sendPasswordResetEmail(this.state.resetEmailField).then(() => {
      this.handleSnackbarShow("Please check your emails for instructions of how to reset your password")
    }).catch(function(error) {
      this.handleSnackbarShow("Error resetting your password", error)
    });
  }

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
  };

  render() {
    const { classes } = this.props;
    const disabled = this.state.email === '' || this.state.password === '';
    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          {this.state.loading && <LinearProgress/>}
          <div className={classes.content}>
            <Typography type="headline">
              Login
            </Typography>
            <TextField
              margin="dense"
              id="email"
              label="Email"
              name="email"
              fullWidth
              onChange={this.handleInputChange}
              value={this.state.email} />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              name="password"
              fullWidth
              type="password"
              onChange={this.handleInputChange}
              value={this.state.password} />
            <div className={classes.actions}>
              <Button disabled={disabled} raised color="primary" onClick={this.handleLogin}>Login</Button>
              <Button style={{float:'right'}} onClick={this.openResetEmailForm}>Forgot password</Button>
            </div>
          </div>
        </Paper>
        <ResetEmailDialog open={this.state.open}
                          handleInputChange={this.handleInputChange}
                          handleRequestClose={this.handleRequestClose}
                          resetEmailField={this.state.resetEmailField}
                          handleResetEmail={this.handleResetEmail}
        />
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Login);

