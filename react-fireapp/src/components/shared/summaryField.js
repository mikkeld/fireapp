import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {formatCurrency} from "../../utils/utils";

const styles = theme => ({
  root: {
    },
  textHeader: {
    display: 'block',
    color: 'grey',
    fontSize: '70%'
  },
  inline: {
    float: 'right',
    paddingRight: theme.spacing.unit*4,
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  },
  clearBoth: {
    clear: 'both',
    marginBottom: theme.spacing.unit*2,
  }
});

const SummaryField = (props) => {
  return (
    <div className={props.classes.inline}>
      <span className={props.classes.textHeader}>{props.title}</span>
      <span>
            <Typography type="display1" style={{color: "black"}}>
              {formatCurrency(props.metric)}
            </Typography>
          </span>
    </div>
  )
};

export default withStyles(styles)(SummaryField);
