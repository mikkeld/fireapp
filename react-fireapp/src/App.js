import React, { Component } from 'react';
import './App.css';

import {Administrator} from './containers/admin/administrator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Control center</h1>
        </header>
        <div>
          <ul>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Admin</a></li>
          </ul>
        </div>
        <hr />
        <div>
          <Administrator/>
        </div>
      </div>
    );
  }
}

export default App;
