import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 2
  },
  gridList: {
    width: 500,
    display: 'relative'
  },
  subheader: {
    width: '100%',
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    size: '120%',
  }
});

export const EntryImageView = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {props.selectedUploads.map((file, index) => (
          <GridListTile key={file.name} cols={file.cols || 1}>
            <img src={file.url} alt={file.name} />
            <CircularProgress/>
            <IconButton className={classes.deleteIcon}
                        onClick={() => props.handleRequestDeleteChip(file, "upload")}
                        color="primary">
               <RemoveCircle  />
            </IconButton>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
};

export default withStyles(styles)(EntryImageView);
