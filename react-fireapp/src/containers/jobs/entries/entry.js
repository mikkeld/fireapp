import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import {FirebaseList} from "../../../utils/firebase/firebaseList";
import ViewEntryDetails from "../../../components/jobs/viewEntry/viewEntryDetails";
import Spinner from "../../../components/spinner";
import ViewJobAttachment from "../../../components/jobs/viewJobAttachment";
import ViewPinnedImageDialog from "../../../components/jobs/viewEntry/viewPinnedImage";
import Button from 'material-ui/Button';
import {findItemById, removeItem, snapshotToArray} from "../../../utils/utils";
import {uploadFile} from "../../../utils/jobsService";
import CreateProductForm from "../../../components/jobs/viewEntry/createProductForm";
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import ViewImageGrid from "../../../components/jobs/viewEntry/viewImageGrid";
import ViewUpdateLog from "../../../components/jobs/viewEntry/viewUpdateLog";
import ViewProducts from "../../../components/jobs/viewEntry/viewProducts";

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit*2
  },
  rightElement: {
    float: 'right'
  }
});

const initialProductFormState = {
  name: '',
  clientPrice: '',
  productPrice: '',
  description: '',
  productQuantity: ''
};

const initialProductFormErrorState = {
  name: '',
  clientPrice: '',
  productPrice: '',
  productQuantity: ''
};

class Entry extends Component {
  constructor() {
    super();

    this.state = {
      currentEntry: null,
      currentProduct: initialProductFormState,
      updateLog: [],
      markedImageOpen: false,
      isEditing: false,
      loading: true,
      openAttachment: null,
      markedImageLoading: false,
      previousMarkedImage: null,
      uploadLoading: false,
      productDialogOpen: false,
      availableProducts: []
    };

    this.firebase = new FirebaseList('entries');
    this.handleMarkedImageClickOpen = this.handleMarkedImageClickOpen.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleMarkedImageClose = this.handleMarkedImageClose.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleProductFormSubmit = this.handleProductFormSubmit.bind(this);
    this.toggleProductFormOpen = this.toggleProductFormOpen.bind(this);
    this.toggleProductFormClose = this.toggleProductFormClose.bind(this);
    this.toggleProductEdit = this.toggleProductEdit.bind(this);
  }


  componentDidMount() {
    this.firebase.db().ref(`entries/${this.props.jobId}/${this.props.entryId}`).on('value', (snap) => {
      const entry = {
        id: snap.key,
        ...snap.val()
      };
      this.setState({currentEntry: entry})
    });

    const previousLogs = this.state.updateLog;

    this.firebase.db().ref(`log/${this.props.jobId}/${this.props.entryId}`).on('child_added', snap => {
      console.log(snap.val());
      previousLogs.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        updateLog: previousLogs,
        loading: false
      })
    });

    this.firebase.databaseSnapshot(`jobs/${this.props.jobId}/selectedProducts`).then((snap) => {
      const products = snapshotToArray(snap);
      this.setState({availableProducts: products})
    });
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentEntry: { ...this.state.currentEntry, [name]: value } });
  };

  handleProductFormInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentProduct: { ...this.state.currentProduct, [name]: value } });
  };


  handleProductFormSubmit(e) {
    e.preventDefault();
    const err = this.validateProductForm();
    if(!err) {
      const updatedSelectedProducts = [
        ...this.state.currentEntry.selectedProducts,
        this.state.currentProduct
      ];
      const updatedCurrentEntry = {
        ...this.state.currentEntry,
        'selectedProducts': updatedSelectedProducts
      };
      this.setState({
        currentEntry: updatedCurrentEntry,
        currentProduct: initialProductFormState
      });
      this.toggleProductFormClose();
    }
  };

  toggleProductEdit(id){
    const editingProduct = findItemById(this.state.currentEntry.selectedProducts, id);
    this.toggleProductFormOpen();
    this.setState({
      currentProduct: editingProduct
    });
    this.toggleProductFormOpen()
  }

  handleProductFormEdit(e) {
    e.preventDefault();
    const err = this.validateProductForm();
    if(!err) {
      this.setState({

      })
    }
  }

  handleProductRemove = (id) => {
    this.setState({currentProduct: initialProductFormState});
    this.firebase.remove(id)
      .then(() => {
        this.toggleProductFormClose();
        this.handleSnackbarShow("Product deleted");
      })
  };

  validateProductForm() {
    const errors = {...initialProductFormErrorState};
    let isError = false;

    if(this.state.currentProduct.name === '') {
      errors.nameError = "You must select a product";
      isError = true
    }

    this.setState({formErrors: errors});

    return isError
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing});
  }

  toggleProductFormOpen() {
    this.setState({productDialogOpen: true})
  }

  toggleProductFormClose() {
    this.setState({productDialogOpen: false})
  }

  saveMarkedImage() {
    this.handleMarkedImageClose(true)
  }

  setMarker(e) {
    const dim = e.target.getBoundingClientRect();
    const position = {
      'pageX': e.pageX - dim.left -25,
      'pageY': e.pageY - dim.top - 50
    };
    const updatedMarkedImage = {
      ...this.state.currentEntry.selectedMarkedImage,
      'position': position
    };
    const updatedCurrentEntry = {
      ...this.state.currentEntry,
      'selectedMarkedImage': updatedMarkedImage
    };
    this.setState({currentEntry: updatedCurrentEntry});
  }

  handleRequestDeleteChip = (data, group) => {
    const itemToChange = new Map([['product', 'selectedProducts'], ['upload', 'selectedUploads']]);
    const selected = itemToChange.get(group);
    const updatedSelectedItems = removeItem(this.state.currentEntry[selected], data.id);
    const updatedEntryStatus = {
      ...this.state.currentEntry,
      [selected]: updatedSelectedItems
    };
    this.setState({currentEntry: updatedEntryStatus});
  };


  handleFileUpload(e) {
    this.setState({uploadLoading: true});
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    uploadFile(formData)
      .then(publicUrl => {
        if(publicUrl.status === 200) {
          const uploadItem = {"name": file.name, "url": publicUrl.data};
          const updatedSelectedUploads = [...this.state.currentEntry.selectedUploads, uploadItem];
          const updatedJobStatus = {
            ...this.state.currentEntry,
            selectedUploads: updatedSelectedUploads
          };
          this.setState({
            uploadLoading: false,
            currentEntry: updatedJobStatus
          })
        } else {
          console.log("error uploading image");
        }
      });
  }


  handleAttachmentDialogClose =() => {
    this.setState({attachmentDialogOpen: false})
  };

  handleClickOpen = (file) => {
    this.setState({
      attachmentDialogOpen: true,
      openAttachment: file
    });
  };

  handleMarkedImageClickOpen = () => {
    this.setState({
      markedImageOpen: true,
      previousMarkedImage: {...this.state.currentEntry.selectedMarkedImage}
    })
  };

  handleMarkedImageClose = (saved) => {
    const markedImage = saved ? this.state.currentEntry.selectedMarkedImage : this.state.previousMarkedImage;
    const updatedCurrentEntry = {
      ...this.state.currentEntry,
      'selectedMarkedImage': markedImage
    };
    this.setState({
      markedImageOpen: false,
      currentEntry: updatedCurrentEntry
    })
  };

  handleMarkedImageLoaded() {
    this.setState({markedImageLoaded: true})
  }

  render() {
    const { classes } = this.props;
    const lastUpdatedSorted = this.state.updateLog.sort((a, b) => b.lastUpated - a.lastUpdated);
    let confirmDelete = () => {
      const r = window.confirm("Confirm deletion of job");
      return r === true;
    };
    return (
      <div className={classes.wrapper}>
        {this.state.loading
          ? <Spinner/>
          : <div>
            {this.state.isEditing
              ? <IconButton color="primary" onClick={() => this.toggleEdit()}>
                  <ArrowBackIcon/>
                </IconButton>
              : <Button color="primary" onClick={() => this.toggleEdit()}>Edit entry</Button>}
              <ViewEntryDetails {...this.state.currentEntry}
                                handleMarkedImageClickOpen={this.handleMarkedImageClickOpen}
                                isEditing={this.state.isEditing}
                                handleInputChange={this.handleInputChange}
              />
              <ViewUpdateLog updateLog={this.state.updateLog} lastUpdate={lastUpdatedSorted[0]} />
              <ViewImageGrid selectedUploads={this.state.currentEntry.selectedUploads}
                             isEditing={this.state.isEditing}
                             handleClickOpen={this.handleClickOpen}
                             uploadLoading={this.state.uploadLoading}
                             handleRequestDeleteChip={this.handleRequestDeleteChip}
                             handleFileUpload={this.handleFileUpload} />
              <ViewProducts products={this.state.currentEntry.selectedProducts}
                            isEditing={this.state.isEditing}
                            toggleProductFormOpen={this.toggleProductFormOpen}
                            toggleEdit={this.toggleProductEdit} />
          </div>}

        <ViewJobAttachment open={this.state.attachmentDialogOpen}
                           handleRequestClose={this.handleAttachmentDialogClose}
                           attachment={this.state.openAttachment} />
        <CreateProductForm open={this.state.productDialogOpen}
                           handleRequestClose={this.toggleProductFormClose}
                           products={this.state.availableProducts}
                           handleInputChange={this.handleProductFormInputChange}
                           handleSubmit={this.handleProductFormSubmit}
                           handleEdit={this.handleProductFormEdit}
                           {...this.state.currentProduct} />
        {this.state.currentEntry &&
          <ViewPinnedImageDialog open={this.state.markedImageOpen}
                                 handleRequestClose={this.handleMarkedImageClose}
                                 attachment={this.state.currentEntry.selectedMarkedImage}
                                 markedImageLoaded={this.state.markedImageLoaded}
                                 handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                                 setMarker={this.setMarker}
                                 saveMarkedImage={this.saveMarkedImage}
                                 isEditing={this.state.isEditing}
                                 previous={this.state.previousMarkedImage}
          />}
      </div>
    );
  }
}

export default withStyles(styles)(Entry);

