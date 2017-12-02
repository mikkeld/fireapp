import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import {FirebaseList} from "../../../utils/firebase/firebaseList";
import ViewEntryDetails from "../../../components/jobs/viewEntry/viewEntryDetails";
import Spinner from "../../../components/shared/spinner";
import ViewJobAttachment from "../../../components/jobs/viewJobAttachment";
import ViewPinnedImageDialog from "../../../components/jobs/viewEntry/viewPinnedImage";
import Button from 'material-ui/Button';
import {findItemById, generateFilename, removeItem, snapshotToArray, updatedItems} from "../../../utils/utils";
import CreateProductForm from "../../../components/jobs/viewEntry/createProductForm";
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import ViewImageGrid from "../../../components/jobs/viewEntry/viewImageGrid";
import ViewUpdateLog from "../../../components/jobs/viewEntry/viewUpdateLog";
import ViewProducts from "../../../components/jobs/viewEntry/viewProducts";
import SimpleSnackbar from "../../../components/shared/snackbar";
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing.unit*2
  },
  rightElement: {
    float: 'right'
  },
  actions: {
    marginBottom: theme.spacing.unit*2
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
      productIsEditing: false,
      loading: true,
      openAttachment: null,
      markedImageLoading: false,
      previousMarkedImage: null,
      uploadLoading: false,
      productDialogOpen: false,
      availableProducts: [],
      showSnackbar: false,
      snackbarMsg: '',
      productsLoading: true,
      progress: 0,
      otherMarkedEntries: []
    };

    this.firebase = new FirebaseList('entries');
    this.handleMarkedImageClickOpen = this.handleMarkedImageClickOpen.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleMarkedImageClose = this.handleMarkedImageClose.bind(this);
    this.handleProductFormSubmit = this.handleProductFormSubmit.bind(this);
    this.handleProductFormEdit = this.handleProductFormEdit.bind(this);
    this.toggleProductFormOpen = this.toggleProductFormOpen.bind(this);
    this.toggleProductFormClose = this.toggleProductFormClose.bind(this);
    this.toggleProductEdit = this.toggleProductEdit.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }


  componentDidMount() {
    this.firebase.db().ref(`entries/${this.props.jobId}/${this.props.entryId}`).on('value', (snap) => {
      const entry = {
        id: snap.key,
        ...snap.val()
      };
      this.setState({
        currentEntry: entry,
        loading: false
      })
    });

    const previousLogs = this.state.updateLog;

    this.firebase.db().ref(`log/${this.props.jobId}/${this.props.entryId}`).on('child_added', snap => {
      previousLogs.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        updateLog: previousLogs
      })
    });

    this.firebase.databaseSnapshot(`jobs/${this.props.jobId}/selectedProducts`).then((snap) => {
      const products = snapshotToArray(snap);
      this.setState({availableProducts: products})
    });
    this.firebase.databaseSnapshot(`entries/${this.props.jobId}`).then((snap) => {
      const entries = snapshotToArray(snap);
      const otherMarkedEntries = entries.filter(entry => entry.id !== this.props.entryId);
      this.setState({otherMarkedEntries: otherMarkedEntries})
    });
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentEntry: { ...this.state.currentEntry, [name]: value } });
  };

  handleEdit() {
    const path = `${this.props.jobId}/${this.props.entryId}`;
    this.firebase.update(path, this.state.currentEntry)
      .then(() => {
        this.toggleEdit();
        this.handleSnackbarShow("Entry updated");
      })
  }

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
    this.setState({
      currentProduct: editingProduct
    });
    this.toggleProductFormOpen(true)
  }

  handleProductFormEdit(e) {
    e.preventDefault();
    const err = this.validateProductForm();
    if(!err) {
      const updatedProducts = updatedItems(this.state.currentEntry.selectedProducts, this.state.currentProduct);
      const updatedEntry = {
        ...this.state.currentEntry,
        'selectedProducts': updatedProducts
      };
      this.setState({
        currentEntry: updatedEntry
      });
      this.toggleProductFormClose();
    }
  }

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

  toggleProductFormOpen = edit => {
    edit
      ? this.setState({
          productDialogOpen: true,
          productIsEditing: true
        })
      : this.setState({
          productDialogOpen: true,
          productIsEditing: false,
          currentProduct: initialProductFormState
        })
  };

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

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ showSnackbar: false });
  };

  handleUploadStart = () => this.setState({uploadLoading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({uploadLoading: false});
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
      const getNameString = (f) => f.substring(0,f.lastIndexOf("_"))+f.substring(f.lastIndexOf("."));
      const uploadItem = {"name": getNameString(filename), "url": url, "id": this.generateRandom()};
      const updatedSelectedUploads = [...this.state.currentEntry.selectedUploads, uploadItem];
      const updatedEntryStatus = {
        ...this.state.currentEntry,
        selectedUploads: updatedSelectedUploads
      };
      this.setState({
        uploadLoading: false,
        currentEntry: updatedEntryStatus
      });
    });
  };

  generateRandom() {
    return parseInt(Math.random());
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
        {this.state.loading || this.state.currentEntry === null
          ? <Spinner/>
          : <div>
            {this.state.isEditing
              ? <div className={classes.actions}>
                  <Button raised color="primary" onClick={() => this.handleEdit()} style={{marginRight: 5}}>Save edits</Button>
                  <Button color="primary" onClick={() => this.toggleEdit()}>Cancel</Button>
                </div>
              : <div>
                  <Link to={{ pathname: `/jobs/${this.props.jobId}` }} style={{textDecoration: 'none'}}>
                    <IconButton color="primary">
                      <ArrowBackIcon/>
                    </IconButton>
                  </Link>
                  <Button style={{float:'right'}} color="primary" onClick={() => this.toggleEdit()}>Edit entry</Button>
                </div>
            }
              <ViewEntryDetails {...this.state.currentEntry}
                                handleMarkedImageClickOpen={this.handleMarkedImageClickOpen}
                                isEditing={this.state.isEditing}
                                handleInputChange={this.handleInputChange}
              />
              <ViewUpdateLog updateLog={this.state.updateLog} lastUpdate={lastUpdatedSorted[0]} />
              {this.state.currentEntry.hasOwnProperty('selectedUploads') &&
              <ViewImageGrid selectedUploads={this.state.currentEntry.selectedUploads}
                             isEditing={this.state.isEditing}
                             handleClickOpen={this.handleClickOpen}
                             handleRequestDeleteChip={this.handleRequestDeleteChip}
                             uploadLoading={this.state.uploadLoading}
                             handleUploadStart={this.handleUploadStart}
                             handleProgress={this.handleProgress}
                             handleUploadError={this.handleUploadError}
                             handleUploadSuccess={this.handleUploadSuccess}
                             firebaseStorage={firebase.storage().ref('images')}
                             filename={file => generateFilename(file)}
                />}
                <ViewProducts products={this.state.currentEntry.selectedProducts}
                              isEditing={this.state.isEditing}
                              toggleProductFormOpen={this.toggleProductFormOpen}
                              toggleEdit={this.toggleProductEdit} />
               </div>
        }

        <ViewJobAttachment open={this.state.attachmentDialogOpen}
                           handleRequestClose={this.handleAttachmentDialogClose}
                           attachment={this.state.openAttachment} />
        <CreateProductForm open={this.state.productDialogOpen}
                           handleRequestClose={this.toggleProductFormClose}
                           products={this.state.availableProducts}
                           handleInputChange={this.handleProductFormInputChange}
                           handleSubmit={this.handleProductFormSubmit}
                           handleEdit={this.handleProductFormEdit}
                           isEditing={this.state.productIsEditing}
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
                                 otherMarkedEntries={this.state.otherMarkedEntries}
          />}
          <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                          handleSnackbarClose={this.handleSnackbarClose}
                          snackbarMsg={this.state.snackbarMsg}
          />
      </div>
    );
  }
}

export default withStyles(styles)(Entry);

