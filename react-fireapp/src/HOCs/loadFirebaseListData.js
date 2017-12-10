import React, { Component } from 'react';
import {FirebaseList} from "../utils/firebase/firebaseList";
import {removeItem, updatedItems} from "../utils/utils";

const WithFirebaseListData = (propName) => (WrappedComponent) => {
  return class WithLoader extends Component {
    constructor() {
      super();
      this.state = {
        [propName]: []
      };
      this.firebase = new FirebaseList(propName);
    }

    componentDidMount() {
      const previousItems = this.state[propName];

      this.firebase.database.on('child_added', snap => {
        previousItems.push({
          id: snap.key,
          ...snap.val()
        });

        this.setState({
          [propName]: previousItems
        })
      });

      this.firebase.database.on('child_changed', snap => {
        const updated = updatedItems(this.state[propName], snap.val());
        this.setState({
          [propName]: updated
        })
      });

      this.firebase.database.on('child_removed', snap => {
        const updated = removeItem(previousItems, snap.key);
        this.setState({
          [propName]: updated
        })
      })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state}/>
    }

  }
};

export default WithFirebaseListData;
