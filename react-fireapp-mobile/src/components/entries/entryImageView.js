import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
});

export const EntryImageView = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {props.selectedUploads.map(file => (
          <GridListTile key={file.name} cols={file.cols || 1}>
            <img src={file.url} alt={file.name} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
};

export default withStyles(styles)(EntryImageView);
