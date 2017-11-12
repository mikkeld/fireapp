import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
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
  },
  wrapper: {
    marginBottom: theme.spacing.unit*2,
  },
  clickable: {
    cursor: 'pointer'
  }
});

export const ViewImageGrid = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Typography type="subheading" color="secondary">
        Pictures
      </Typography>
      <Paper className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {props.selectedUploads.map(file => (
            <GridListTile key={file.name} cols={file.cols || 1}>
              <img src={file.url}
                   alt={file.name}
                   onClick={() => props.handleClickOpen(file)}
                   className={classes.clickable}/>
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
        {props.isEditing && <input type="file" id="myFile" onChange={props.handleFileUpload} />}
        {props.uploadLoading
          ? <CircularProgress/>
          : null}
      </Paper>
    </div>
  )
};

export default withStyles(styles)(ViewImageGrid);
