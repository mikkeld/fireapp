import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import {
  Link
} from 'react-router-dom';

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
    }
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <h4>Entries...</h4>
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