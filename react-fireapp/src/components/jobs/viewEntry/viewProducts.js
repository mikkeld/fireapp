import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ListProductsTable from "./listProductsTable";
import {calculateTotalCost} from "../../../utils/jobsService";
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  textHeader: {
    display: 'block',
    color: 'grey',
    fontSize: '70%'
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
  inline: {
    float: 'right',
    paddingRight: theme.spacing.unit*2,
  },
  clearBoth: {
    clear: 'both',
    marginBottom: theme.spacing.unit*2,
  }
});

export const ViewProducts = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Products
      </Typography>
      <Paper className={classes.root}>
        {props.isEditing && <Button color="primary" onClick={() => props.toggleProductFormOpen()}>Add product</Button>}
        <ListProductsTable products={props.products}
                           isEditing={props.isEditing}
                           toggleEdit={props.toggleEdit} />
        <div className={classes.inline}>
          <span className={classes.textHeader}>Total Product Cost</span>
          <span>
            <Typography type="display1">
              {calculateTotalCost(props.products, "product")}
            </Typography>
          </span>
        </div>
        <div className={classes.inline}>
          <span className={classes.textHeader}>Total Client Cost</span>
          <div>
            <Typography type="display1">
              {calculateTotalCost(props.products, "client")}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewProducts);
