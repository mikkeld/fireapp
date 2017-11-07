import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Jobs from "./containers/jobs/jobs";
import FireAppBar from "./components/appBar";
import Entries from "./containers/entries/entries";
import CreateEntry from "./containers/entries/createEntry";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <FireAppBar />
          <div>
            <Route exact path="/" component={Jobs} />
            <Route path="/entries/:id" component={Entries} />
            <Route path="/createEntry/:id" component={CreateEntry} />
          </div>
        </div>

      </Router>
    );
  }
}

export default App;