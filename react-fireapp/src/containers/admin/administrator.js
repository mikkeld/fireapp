import React, { Component } from 'react';
import {User} from "./users";
import {
  Route,
  Link
} from 'react-router-dom';
import {Companies} from "./companies";
import Products from "./products";

export class Administrator extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Route exact path="/admin/" component={User} />
        <Route path="/admin/users" component={User} />
        <Route path="/admin/companies" component={Companies} />
        <Route path="/admin/products" component={Products} />
      </div>
    );
  }
}

