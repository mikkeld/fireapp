import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import CheckCircle from 'material-ui-icons/CheckCircle';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: 320,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    overflowX: 'auto',
    align: 'left',
    maxWidth: 700
  },
  table: {
    minWidth: 700,
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
  chipContainer: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  green: {
    color: 'green'
  },
  actionSection: {
    float: 'right'
  }
});



export const CreateJob = (props) => {
  const ProductFormGroup = () => (
      <TextField
        helperText={"Example: €300"}
        margin="dense"
        id="productPrice"
        label="Product Price"
        name="productPrice"
        className={classes.textField}
        onChange={props.handleInputChange('productPrice')}
        value={props.productPrice} />
  );
  return (
    <div>
      <TextField
        helperText={"Example: €300"}
        margin="dense"
        id="companyPrice"
        label="Company Price"
        name="companyPrice"
        className={classes.textField}
        onChange={props.handleInputChange('productPrice')}
        value={props.companyPrice} />
      <ProductFormGroup/>
    </div>
  )
};

export default withStyles(styles)(CreateJob);