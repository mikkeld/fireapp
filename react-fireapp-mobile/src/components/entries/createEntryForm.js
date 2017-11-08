import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import EntryImageView from "./entryImageView";
import {MarkedImage} from "./markedImage";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  chipContainer: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  root: {
    width: '100%',
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  wrapper: {
    marginTop: theme.spacing.unit*2
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
});



export const CreateEntryForm = (props) => {
  const { classes } = props;

  const ProductFormGroup = () => (
    <div>
      <TextField
        id="selectedProduct"
        select
        label="Select a product"
        error={props.selectProductError !== ''}
        margin="normal"
        fullWidth
        className={props.textField}
        value={(props.currentEntry.currentProduct === undefined || props.currentEntry.currentProduct === null) ? "" : props.currentEntry.currentProduct}
        onChange={props.handleInputChange('currentProduct')}
        SelectProps={{
          MenuProps: {
            className: props.menu,
          },
          name: "currentProduct"
        }}
        helperText={props.selectProductError || "Example: Product 1"}
      >
        {props.job.selectedProducts.map((product, index) => (
          <MenuItem key={index} value={product}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        helperText={"Example: 5"}
        fullWidth
        margin="dense"
        id="productQuantity"
        label="Product Quantity"
        name="productQuantity"
        className={props.textField}
        onChange={props.handleInputChange('productQuantity')}
        value={props.productQuantity} />
      <Button color="primary" onClick={() => props.addSelectedChip()}>add product</Button>
    </div>
  );


  return (
    <div>
      <section className={classes.section}>
        <Typography type="title" gutterBottom>
          Add tag location
        </Typography>
        {props.job &&
        <Paper className={classes.root}>
          <TextField
            id="currentUpload"
            select
            label="Select an image to mark"
            margin="normal"
            fullWidth
            className={props.textField}
            value={props.currentUpload || ''}
            onChange={props.handleInputChange('currentUpload')}
            SelectProps={{
              MenuProps: {
                className: props.menu,
              },
              name: "currentUpload"
            }}
          >
            {props.job.selectedUploads.map((file, index) => (
              <MenuItem key={index} value={file}>
                {file.name}
              </MenuItem>
            ))}
          </TextField>
          <Button color="primary" onClick={() => props.handleAttachmentDialogOpen(props.job.selectedUploads)}>
            Set marker on image
          </Button>
          {props.selectedMarkedImage &&
            <MarkedImage markerPosition={props.selectedMarkedImage.position}
                         attachment={props.selectedMarkedImage.attachment}
                         imageLoaded={props.markedImageLoaded}
                         handleImageLoaded={props.handleMarkedImageLoaded}
            />}
        </Paper>
        }
      </section>
      <section className={classes.section}>
        <Typography type="title" gutterBottom>
          Add a product to the job
        </Typography>
        <Paper className={classes.root}>
          <div className={classes.chipContainer}>
            {props.selectedProducts.map((product, index) => {
              return (
                <Chip
                  label={product.name}
                  key={index}
                  className={classes.chip}
                  // onRequestDelete={() => props.handleRequestDeleteChip(product, "product")}
                />
              )
            })}
          </div>
          {props.job && <ProductFormGroup/>}
        </Paper>
      </section>
      <section className={classes.section}>
        <Typography type="title" gutterBottom>
          Add pictures to the entry
        </Typography>
        <Paper className={classes.root}>
          <input type="file" id="myFile" onChange={props.handleFileUpload} />
          {props.uploadLoading
              ? <CircularProgress/>
              : null}
          {props.selectedUploads.length > 0 && <EntryImageView selectedUploads={props.selectedUploads}/>}
        </Paper>
      </section>
      <section className={classes.section}>
        <Typography type="title" gutterBottom>
          Add comments to the entry
        </Typography>
        <Paper className={classes.root}>
          <TextField
            id="locationDescription"
            label="Location Description"
            multiline
            rows="4"
            value={props.locationDescription}
            onChange={props.handleInputChange('locationDescription')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="comments"
            label="Comments"
            multiline
            rows="4"
            value={props.comments}
            onChange={props.handleInputChange('comments')}
            margin="normal"
            fullWidth
          />
        </Paper>
      </section>
      <Button color="primary" onClick={props.handleSubmit}>Create entry</Button>

    </div>
  )
};

export default withStyles(styles)(CreateEntryForm);
