import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import ListProductsTable from "../../components/admin/products/listProductsTable";
import {createProduct, deleteProduct, loadProduct, loadProducts, updateProduct} from "../../utils/productService";
import CreateProductForm from "../../components/admin/products/createProductForm";
import {findUserById, updatedUsers, removeUser} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';

const initialFormState = {
  id: 0,
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
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      createProductVisible: false,
      open: false,
      showSnackbar: false,
      snackbarMsg: '',
      message: '',
      search: '',
      isEditting: false,
      currentProduct: initialFormState,
      formErrors: initialFormErrorState
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
  }

  componentDidMount() {
    loadProducts()
      .then(products => this.setState({products}))
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      const newProduct = {
        ...this.state.currentProduct,
        id: this.generateRandom()
      };

      const updatedProduct = [...this.state.products, newProduct];
      this.setState({
        users: updatedProduct
      });
      createProduct(newProduct)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Product created");
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.setState({
        products: updatedUsers(this.state.products, this.state.currentProduct)
      });
      updateProduct(this.state.currentProduct)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Product updated");
        })
    }
  }

  handleRemove = (id) => {
    const updated = removeUser(this.state.products, id);
    this.setState({products: updated, currentProduct: initialFormState});
    deleteProduct(id)
      .then(() => {
        this.handleRequestClose();
        this.handleSnackbarShow("Product deleted");
      })
  };

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentProduct.name === '' ||
      (this.state.products.findIndex(product => product.name === this.state.currentProduct.name) !== -1 && !this.state.isEditting)) {
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
    const editingProduct = findUserById(this.state.products, id);
    this.handleClickOpen();
    this.setState({
      currentProduct: editingProduct,
      isEditting: true
    });
  }

  generateRandom() {
    return parseInt(Math.random());
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  handleClickOpen = () => {
    this.setState({
      open: true
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
    let filteredProducts = this.state.products.filter(
      (product) => {
        return product.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
        <h1>Products</h1>
        <div>
          <Button color="primary"
                  onClick={() => {this.handleClickOpen(); this.setState({isEditting: false})}}>
            Create Product
          </Button>
          <TextField
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            id="search"
            label="Search product"
            className={styles.textField}
            type="search"
            margin="normal"/>
        </div>
        <ListProductsTable products={filteredProducts} toggleEdit={this.toggleEdit}/>
        {
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
        }
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

