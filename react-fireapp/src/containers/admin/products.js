import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import ListProductsTable from "../../components/admin/products/listProductsTable";
import CreateProductForm from "../../components/admin/products/createProductForm";
import {findItemById, updatedItems, removeItem} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';
import {FirebaseList} from "../../utils/firebase/firebaseList";
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';


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

class Products extends Component {
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

    this.firebase = new FirebaseList('products');
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
  }

  componentDidMount() {
    const previousProducts = this.state.products;

    this.firebase.database.on('child_added', snap => {
      previousProducts.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        products: previousProducts
      })
    });

    this.firebase.database.on('child_changed', snap => {
      const updatedProducts = updatedItems(this.state.products, this.state.currentProduct);
      this.setState({
        products: updatedProducts
      })
    });

    this.firebase.database.on('child_removed', snap => {
      const updatedProducts = removeItem(previousProducts, snap.key);
      this.setState({
        products: updatedProducts
      })
    })
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
    const editingProduct = findItemById(this.state.products, id);
    this.handleClickOpen();
    this.setState({
      currentProduct: editingProduct,
      isEditting: true
    });
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
    const {classes} = this.props;
    let filteredProducts = this.state.products.filter(
      (product) => {
        return product.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
        <Typography type="title" gutterBottom>
          Products
        </Typography>
        <div className={classes.container}>
          <Button color="primary"
                  onClick={() => {this.handleClickOpen(); this.setState({isEditting: false})}}>
            Create Product
          </Button>
          <TextField
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            id="search"
            label="Search product"
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

export default withStyles(styles)(Products);