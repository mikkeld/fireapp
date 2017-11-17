import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {Administrator} from './containers/admin/administrator';
import {Jobs} from "./containers/jobs/jobs";
import {Reports} from "./containers/reports/reports";
import {ActivityReport} from "./containers/reports/activityReport";
import ResponsiveDrawer from "./components/shared/responsiveDrawer";
import ViewJob from "./containers/jobs/viewJob";
import Entry from "./containers/jobs/entries/entry";
import {JobReport} from "./containers/reports/jobReport";


class App extends Component {
  findComponent = (location) => {
    switch (location.pathname) {
      case '/admin':
        return 'Administrator';
      case '/admin/products':
        return 'Products';
      case '/admin/users':
        return 'Users';
      case '/jobs':
        return 'Jobs';
      case '/reports':
        return 'Reports';
      default:
        return 'Administrator';
    }
  };

  render() {

    return (
      <Router>
        <Route render={({ location }) => (
          <ResponsiveDrawer componentTitle={this.findComponent(location)} location={location}>
            <div className="App">
              <Route exact path="/" component={Administrator} />
              <Route path="/admin" component={Administrator} />
              <Route exact path="/jobs" component={Jobs} />
              <Route path="/jobs/:id" render={({match}) => <ViewJob id={match.params.id} />} />
              <Route path="/entries/:jobId/:entryId" render={({match}) => <Entry jobId={match.params.jobId} entryId={match.params.entryId} />} />
              <Route exact path="/reports" component={Reports} />
              <Route path="/reports/:jobId" render={({match}) => <JobReport id={match.params.jobId} />} />
              <Route path="/reports/activity" component={ActivityReport} />
            </div>
           </ResponsiveDrawer>
          )}
        />
     </Router>

    );
  }
}

export default App;
