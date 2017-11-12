import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
  },
  textFieldSelect: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
    marginTop: 25
  },
  menu: {
    width: 200,
  },
  contentStyle: {
    width: '90%',
    height: '90%'
  },
  createNewMenuItem: {
    color: "green"
  }
});


export const CreateProductForm = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of product");
    return r === true;
  };

  return (
    <div>
      <Dialog open={props.open}
              onRequestClose={props.handleRequestClose}>
        <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
          <DialogTitle>{props.isEditting ? "Edit product " + props.name : "Add product to entry"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update product details
            </DialogContentText>
            <TextField
              id="name"
              select
              label="Product"
              margin="normal"
              className={classes.textFieldSelect}
              value={props.name}
              onChange={props.handleInputChange('name')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
                name: "name"
              }}
            >
              {props.products.map(product => (
                <MenuItem key={product.name} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              helperText={"Example: 5"}
              margin="dense"
              id="productQuantity"
              label="Product Quantity"
              name="productQuantity"
              className={classes.textField}
              onChange={props.handleInputChange('productQuantity')}
              value={props.productQuantity} />
            <TextField
              helperText={"Example: €300"}
              margin="dense"
              id="productPrice"
              label="Product Price"
              name="productPrice"
              className={classes.textField}
              onChange={props.handleInputChange('productPrice')}
              value={props.productPrice} />
            <TextField
              helperText={"Example: €400"}
              margin="dense"
              id="clientPrice"
              label="Client Price"
              name="clientPrice"
              className={classes.textField}
              onChange={props.handleInputChange('clientPrice')}
              value={props.clientPrice} />
            <TextField
              id="description"
              label="description"
              multiline
              rows="4"
              value={props.description}
              onChange={props.handleInputChange('description')}
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {props.isEditting
              ? <Button onClick={() => { if(confirmDelete()) {props.handleRemove(props.id)}}}>⚠️ Delete</Button>
              : null
            }
            <Button color="primary" onClick={props.handleRequestClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">{props.isEditting ? "Edit" : "Save"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
};

export default withStyles(styles)(CreateProductForm);