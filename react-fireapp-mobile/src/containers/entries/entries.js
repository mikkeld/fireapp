import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import EntriesTable from "../../components/entries/entriesTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import AppBar from "../../components/appBar";
import Typography from 'material-ui/Typography';
import AddButton from "../../components/shared/addButton";
import Spinner from "../../components/shared/spinner";
import SimpleSnackbar from "../../components/shared/snackbar";

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
    zIndex: 0
  },
  content: {
  },
});

const NoEntriesView = (classes) => {
  return (
    <div className={classes.content}>
      <Typography type="display1" gutterBottom>
        No entries for the job. <br/> Add an entry below.
      </Typography>
    </div>
  )
};


class Entries extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      jobId: '',
      loading: true,
      showSnackbar: false,
      snackbarMsg: ''
    };
    this.firebase = new FirebaseList('entries');
  }

  componentDidMount() {
    this.jobKey = this.props.match.params.id;
    let snackBarMsgMap = new Map([["create", "Entry added"], ["edit", "Entry updated"]]);
    this.props.match.params.type && this.handleSnackbarShow(snackBarMsgMap.get(this.props.match.params.type));
    this.firebase.databaseSnapshot(`jobs/${this.jobKey}`).then(snap => this.setState({jobId: snap.val().jobId}));
    this.firebase.path = `entries/${this.jobKey}`;
    const previousEntries = this.state.entries;

    this.firebase.databaseSnapshot(this.firebase.path).then((snap) => {
      if (snap.val() === null) {
        this.setState({loading: false})
      }
    });

    this.firebase.database.on('child_added', snap => {
      previousEntries.push({
        id: snap.key,
        ...snap.val()
      });
      this.setState({
        entries: previousEntries,
        loading: false
      });
    })
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
    return (
      <div className="App">
        <AppBar title={`Entries for ${this.state.jobId}`} route={"/jobs"}/>
        { this.state.loading && <Spinner /> }
        { this.state.entries.length === 0 && !this.state.loading
          ? <NoEntriesView classes={classes}/>
          : <EntriesTable entries={this.state.entries} jobId={this.state.jobId} jobKey={this.jobKey}/>
        }
        <AddButton jobKey={this.jobKey}/>
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Entries);