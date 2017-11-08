import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import {
  Link
} from 'react-router-dom';
import EntriesTable from "../../components/entries/entriesTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
    zIndex: 0
  },
});

class Entries extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    };
    this.firebase = new FirebaseList('entries');
  }

  componentDidMount() {
    this.firebase.path = `entries/${this.props.match.params.id}`;
    const previousEntries = this.state.entries;

    this.firebase.database.on('child_added', snap => {
      previousEntries.push({
        id: snap.key,
        ...snap.val()
      });
      this.setState({
        entries: previousEntries
      });
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <EntriesTable entries={this.state.entries}/>
        <Link to={{ pathname: `/createEntry/${this.props.match.params.id}` }}>
          <Button fab color="primary" aria-label="add" className={classes.button}>
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Entries);