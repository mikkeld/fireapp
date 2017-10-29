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

const pricingMethods = [
  {
    name: "sqm",
    value: "Per Square Meter",
  },
  {
    name: "unit",
    value: "Per Unit" ,
  }
];


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
          <DialogTitle>{props.isEditting ? "Edit product " + props.name : "Create new product"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update product details
            </DialogContentText>
            <TextField
              error={props.nameError !== ''}
              helperText={props.nameError || "Example: Nullifire"}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              fullWidth
              onChange={props.handleInputChange('name')}
              value={props.name} />
            <TextField
              id="pricing"
              select
              label="Select a pricing method"
              margin="normal"
              className={classes.textFieldSelect}
              value={props.pricing}
              onChange={props.handleInputChange('pricing')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
                name: "pricing"
              }}
              helperText="Example: per sqm"
            >
              {pricingMethods.map(method => (
                <MenuItem key={method.name} value={method.value}>
                  {method.value}
                </MenuItem>
              ))}
            </TextField>
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