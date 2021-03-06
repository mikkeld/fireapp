import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import ListProductsTable from "../../components/admin/products/listProductsTable";
import CreateProductForm from "../../components/admin/products/createProductForm";
import {findItemById} from "../../utils/utils";
import SimpleSnackbar from '../../components/shared/snackbar';
import {FirebaseList} from "../../utils/firebase/firebaseList";
import { withStyles } from 'material-ui/styles';
import AddButton from "../../components/shared/addButton";
import WithFirebaseListData from "../../HOCs/loadFirebaseListData";

const initialFormState = {
  name: '',
  pricing: 'sqm',
  description: ''
};

const initialFormErrorState = {
  nameError: ''
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldSearch: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    float: 'right',
  },
  menu: {
    width: 200,
  },
});

const LIST_NAME = 'products';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      createProductVisible: false,
      open: false,
      showSnackbar: false,
      snackbarMsg: '',
      search: '',
      isEditting: false,
      currentProduct: initialFormState,
      formErrors: initialFormErrorState
    };

    this.firebase = new FirebaseList(LIST_NAME);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.push(this.state.currentProduct)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Product created");
          this.setState({currentProduct: initialFormState})
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.update(this.state.currentProduct.id, this.state.currentProduct)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Product updated");
        })
    }
  }

  handleRemove = (id) => {
    this.setState({currentProduct: initialFormState});
    this.firebase.remove(id)
      .then(() => {
        this.handleRequestClose();
        this.handleSnackbarShow("Product deleted");
      })
  };

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentProduct.name === '' ||
      (this.props.products.findIndex(product => product.name === this.state.currentProduct.name) !== -1 && !this.state.isEditting)) {
      errors.nameError = "Invalid product name or the product already exists";
      isError = true
    }

    this.setState({formErrors: errors});

    return isError
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentProduct: { ...this.state.currentProduct, [name]: value } });
  };

  toggleEdit(id){
    const editingProduct = findItemById(this.props.products, id);
    this.setState({
      currentProduct: editingProduct,
      isEditting: true,
      open: true
    });
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      isEditting: false
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      currentProduct: initialFormState,
      formErrors: initialFormErrorState
    });
  };

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
  };


  render() {
    const {classes} = this.props;
    let filteredProducts = this.props.products.filter(
      (product) => {
        return product.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
        <div className={classes.container}>
          <AddButton tooltip="Create new product" handleClick={this.handleClickOpen}/>
          <TextField
            value={this.state.search}
            onChange={this.updateSearch}
            id="search"
            label="Search products"
            className={classes.textField}
            type="search"
            margin="normal"/>
        </div>
        <ListProductsTable products={filteredProducts} toggleEdit={this.toggleEdit}/>
        <CreateProductForm handleSubmit={this.handleSubmit}
                           handleEdit={this.handleEdit}
                           handleRemove={this.handleRemove}
                           isEditting={this.state.isEditting}
                           handleInputChange={this.handleInputChange}
                           {...this.state.currentProduct}
                           {...this.state.formErrors}
                           open={this.state.open}
                           handleRequestClose={this.handleRequestClose}
        />

        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

export default withStyles(styles)(WithFirebaseListData(LIST_NAME)(Products));