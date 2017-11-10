import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Jobs from "./containers/jobs/jobs";
import Entries from "./containers/entries/entries";
import CreateEntry from "./containers/entries/createEntry";
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
});


class App extends Component {
  componentWillReceiveProps(nextProps) {
   console.log(nextProps.location)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Route exact path="/" component={Jobs} />
            <Route path="/jobs" component={Jobs} />
            <Route exact path="/entries/:id/" component={Entries} />
            <Route path="/entries/:id/:type" component={Entries} />
            <Route path="/createEntry/:id" component={CreateEntry} />
            <Route path="/editEntry/:id/:entry" component={CreateEntry} />
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
