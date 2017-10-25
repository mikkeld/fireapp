import React, { Component } from 'react';
import {User} from "./user";
import {
  Route,
  Link
} from 'react-router-dom';
import {Companies} from "./companies";
import {Products} from "./products";

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
        <Link className="navLink" to="/admin/users">Users</Link>
        <Link className="navLink" to="/admin/companies">Companies</Link>
        <Link className="navLink" to="/admin/products">Products</Link>
        <Route exact path="/admin/" component={User} />
        <Route path="/admin/users" component={User} />
        <Route path="/admin/companies" component={Companies} />
        <Route path="/admin/products" component={Products} />
      </div>
    );
  }
}

