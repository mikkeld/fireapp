import React, { Component } from 'react';
import { User } from "./user";

export class Administrator extends Component {
  constructor() {
    super();
  }

  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <ul>
          <li><a href="#">Users</a></li>
          <li><a href="#">Product</a></li>
          <li><a href="#">Companies</a></li>
        </ul>

        <User/>
      </div>
    );
  }
}

