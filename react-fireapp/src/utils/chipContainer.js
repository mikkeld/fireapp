import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import {removeItem} from "./utils";
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  chipContainer: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  }
});

export class InteractiveChipContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: []
    };
  }

  addSelectedChip = () => {
    const updatedItems = [...this.state.selectedItems, this.props.currentItem];
    this.setState({selectedItems: updatedItems});
    this.onChipChange(updatedItems)
  };

  handleRequestDeleteChip = item => {
    const remainingItems = removeItem(this.state.selectedItems, item.id);
    this.setState({selectedItems: remainingItems});
    this.onChipChange(remainingItems)
  };

  onChipChange = () => {
    this.props.onChipChange(this.state.selectedItems, this.props.chipContainerName, this.props.currentItemRef)
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.currentItem &&
        <Button color="primary" onClick={() => this.addSelectedChip()}>{`Add ${this.props.chipContainerName}`}</Button>}
        <div className={classes.chipContainer}>
          {this.state.selectedItems.map((item, index) => {
            return (
              <Chip
                label={item[this.props.name]}
                key={index}
                className={classes.chip}
                onRequestDelete={() => this.handleRequestDeleteChip(item)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

InteractiveChipContainer.propTypes = {
  onChipChange: PropTypes.func.isRequired,
  chipContainerName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  currentItem: PropTypes.object,
  currentItemRef: PropTypes.string,
};

export default withStyles(styles)(InteractiveChipContainer);