import React, { Component } from 'react';
import {FirebaseList} from "../../utils/firebase/firebaseList";
import ViewTotalProductTable from "../../components/reports/products/listProductsTable";
import ViewItemizedTable from "../../components/reports/products/listProductsTableItemized";
import {calculateTotalPerProduct} from "../../utils/jobsService";

export class JobReport extends Component {
  constructor() {
    super();

    this.state = {
      entries: [],
      loading: true
    };
    this.firebase = new FirebaseList('entries');
  }

  componentDidMount() {
    this.firebase.path = `entries/${this.props.id}`;
    const previousEntries = this.state.entries;

    this.firebase.database.on('child_added', snap => {
      previousEntries.push({
        id: snap.key,
        ...snap.val()
      });
      this.setState({
        entries: previousEntries,
        loading: false
      });
    })
  }

  render() {
    let {costPerProduct, costPerItem} = calculateTotalPerProduct(this.state.entries);
    return (
      <div>
        <ViewTotalProductTable products={costPerProduct} total={costPerItem}/>
        <ViewItemizedTable entries={this.state.entries}/>
      </div>
    );
  }
}

