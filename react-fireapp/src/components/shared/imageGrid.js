import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  gridList: {
    width: 500,
    display: 'relative',
    padding: theme.spacing.unit,
  },
  subheader: {
    width: '100%',
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
  clickable: {
    cursor: 'pointer'
  }
});

export const ImageGrid = (props) => {
  const { classes } = props;
  const toggleImageLoading = () => imageLoading = false;
  let imageLoading = true;
  return (
    <GridList cellHeight={160} className={classes.gridList} cols={3}>
      {props.selectedUploads.map(file => (
        <GridListTile key={file.name} cols={file.cols || 1}>
          <img src={file.url}
               alt={file.name}
               onClick={() => props.handleClickOpen(file)}
               className={classes.clickable}/>
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

export default withStyles(styles)(ImageGrid);
