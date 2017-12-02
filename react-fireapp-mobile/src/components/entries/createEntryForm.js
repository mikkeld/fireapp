import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import EntryImageView from "./entryImageView";
import {MarkedImage} from "./markedImage";
import FileUploader from 'react-firebase-file-uploader';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit*2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
  chipContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageView: {
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'auto'
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  wrapper: {
    marginTop: theme.spacing.unit*2,
  },
});


const ProductFormGroup = (props) => (
  <div>
    <TextField
      id="selectedProduct"
      required
      select
      label="Select a product"
      error={props.selectProductError !== ''}
      margin="normal"
      fullWidth
      value={(props.currentProduct === undefined || props.currentProduct === null) ? "" : props.currentProduct}
      onChange={props.handleInputChange('currentProduct')}
      SelectProps={{
        MenuProps: {
          className: props.menu,
        },
        name: "currentProduct"
      }}
      helperText={props.selectProductError || ""}
    >
      {props.availableProducts.map((product, index) => (
        <MenuItem key={index} value={product}>
          {product.name}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      margin="dense"
      id="productQuantity"
      label="Product Quantity"
      fullWidth
      type="number"
      className={props.classes.wrapper}
      name="productQuantity"
      onChange={props.handleInputChange('productQuantity')}
      value={props.productQuantity} />
    <Button color="primary"
            onClick={() => props.addSelectedChip()}
            disabled={(props.productQuantity === '' || props.currentProduct === null)}>
      add product
    </Button>
  </div>
);

const MarkImageView = (props) => (
  <div>
    <TextField
      id="currentUpload"
      select
      label="Select an image to mark"
      margin="normal"
      fullWidth
      value={props.currentUpload || ''}
      onChange={props.handleInputChange('currentUpload')}
      SelectProps={{
        MenuProps: {
          className: props.menu,
        },
        name: "currentUpload"
      }}
    >
      {props.availableAttachments.map((file, index) => (
        <MenuItem key={index} value={file}>
          {file.name}
        </MenuItem>
      ))}
    </TextField>
    {props.currentUpload &&
    <Button color="primary" onClick={() => props.handleAttachmentDialogOpen(props.availableAttachments)}>
      Edit marker on image
    </Button>}
    {props.selectedMarkedImage &&
      <div className={props.classes.imageView}>
        <MarkedImage markerPosition={props.selectedMarkedImage.position}
                     selectedMarkedImage={props.selectedMarkedImage}
                     currentUpload={props.currentUpload}
                     imageLoaded={props.markedImageLoaded}
                     handleMarkedImageLoaded={props.handleMarkedImageLoaded}
                     otherMarkedEntries={props.otherMarkedEntries}
        />
      </div>
    }
  </div>
);

const SelectedProductsChipContainer = (props) => (
  <div className={props.classes.wrapper}>
    <Typography type="subheading" gutterBottom>
      Selected Products
    </Typography>
    <div className={props.classes.chipContainer}>
      {props.selectedProducts.map((product, index) => {
        return (
          <Chip
            label={`${product.name} (${product.productQuantity})`}
            key={index}
            className={props.classes.chip}
            onRequestDelete={() => props.handleRequestDeleteChip(product, "product")}
          />
        )
      })}
    </div>
  </div>
);

const SelectedImagesView = (props) => (
  <div className={props.classes.wrapper}>
    <Typography type="subheading" gutterBottom>
      Selected images
    </Typography>
    <FileUploader
      accept="image/*"
      name="image"
      filename={props.filename}
      storageRef={props.firebaseStorage}
      onUploadStart={props.handleUploadStart}
      onUploadError={props.handleUploadError}
      onUploadSuccess={props.handleUploadSuccess}
      onProgress={props.handleProgress}
    />
    {props.uploadLoading
      ? <CircularProgress/>
      : null}
    {props.selectedUploads.length > 0 && <EntryImageView selectedUploads={props.selectedUploads}
                                                         handleRequestDeleteChip={props.handleRequestDeleteChip} />}
  </div>
);

const LocationDescriptionTextField = (props) => (
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
);

const CommentsTextField = (props) => (
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
);


export const CreateEntryForm = (props) => {
  const { classes } = props;
  const buttonTitle = props.isEditing ? "Edit entry" : "Create entry";
  return (
    <div>
      {props.job && <MarkImageView {...props} classes={classes}/>}
      {props.selectedProducts.length > 0 && <SelectedProductsChipContainer {...props} classes={classes}/>}
      {props.job && <ProductFormGroup {...props}/>}
      <SelectedImagesView {...props} classes={classes} />
      <LocationDescriptionTextField {...props} />
      <CommentsTextField {...props} />
      <Button raised color="primary" style={{float: 'right'}} onClick={props.handleSubmit}>{ buttonTitle }</Button>
    </div>
  )
};

export default withStyles(styles)(CreateEntryForm);
