import React, { Component } from 'react';
import Spinner from "../components/shared/spinner";
import {FirebaseList} from "../utils/firebase/firebaseList";

const WithLoader = (propName) => (WrappedComponent) => {
  return class WithLoader extends Component {
    constructor() {
      super();
      this.state = {
        FireBasePathEmpty: false
      };
      this.firebase = new FirebaseList(propName);
    }

    componentDidMount() {
      this.firebase.databaseSnapshot(propName).then((snap) => {
        if (snap.val() === null) {
          this.setState({FireBasePathEmpty: true})
        }
      });
    }

    isEmpty(prop) {
      return (
        prop === null ||
        prop === undefined ||
        (prop.hasOwnProperty('length') && prop.length === 0) ||
        (prop.constructor === Object && Object.keys(prop).length === 0)
      ) && !this.state.FireBasePathEmpty
    }

    render() {
      return this.isEmpty(this.props[propName]) ? <Spinner /> : <WrappedComponent {...this.props}/>
    }

  }
};

export default WithLoader;
