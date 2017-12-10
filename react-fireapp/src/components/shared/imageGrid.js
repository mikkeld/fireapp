import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
  },
  gridList: {
    width: 500,
    display: 'relative',
    padding: theme.spacing.unit,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    size: '120%',
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
  clickAble: {
    cursor: 'pointer'
  }
});

const ImageGrid = (props) => {
  const { classes } = props;
  let imageLoading = true;
  return (
    <GridList cellHeight={160} className={classes.gridList} cols={3}>
      {props.attachment.map(file => (
        <GridListTile key={file.name} cols={file.cols || 1}>
          <img src={file.url}
               alt={file.name}
               onClick={() => props.handleDialogShow(file)}
               className={classes.clickAble}/>
          {imageLoading
            ? <CircularProgress/>
            : null
          }
          {props.isEditing
            ? <IconButton className={classes.deleteIcon}
                          onClick={() => props.handleRequestDeleteChip(file, "upload")}
                          color="primary">
              <RemoveCircle/>
            </IconButton>
            : ""
          }
        </GridListTile>
      ))}
    </GridList>
  )
};

ImageGrid.propTypes = {
  attachment: PropTypes.array,
  handleRequestDeleteChip: PropTypes.func,
  isEditing: PropTypes.bool
};

export default withStyles(styles)(ImageGrid);
