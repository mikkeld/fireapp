import React, { Component } from 'react';
import User from "./users";
import {
  Route,
} from 'react-router-dom';
import Companies from "./companies";
import Products from "./products";


export class Administrator extends Component {
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

