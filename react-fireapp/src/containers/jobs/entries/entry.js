import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {FirebaseList} from "../../../utils/firebase/firebaseList";
import ViewEntryDetails from "../../../components/jobs/viewEntry/viewEntryDetails";
import Spinner from "../../../components/shared/spinner";
import JobAttachmentDialog from "../../../components/jobs/jobAttachmentDialog";
import PinnedImageDialog from "../../../components/jobs/pinnedImageDialog";
import {findItemById, removeItem, snapshotToArray, updatedItems} from "../../../utils/utils";
import CreateProductForm from "../../../components/jobs/viewEntry/createProductForm";
import ViewImageGrid from "../../../components/jobs/viewEntry/viewImageGrid";
import ViewUpdateLog from "../../../components/jobs/viewEntry/viewUpdateLog";
import ViewProducts from "../../../components/jobs/viewEntry/viewProducts";
import EntryActions from "../../../components/jobs/viewEntry/viewActions";
import SimpleSnackbar from "../../../components/shared/snackbar";
import { ViewEntryDialogOptions } from "../../../utils/jobs/viewEntryDialogOptions";

const styles = theme => ({
  wrapper: {
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
      originalCurrentEntry: null,
      currentProduct: initialProductFormState,
      updateLog: [],
      availableProducts: [],
      otherMarkedEntries: [],
      isEditing: false,
      productIsEditing: false,
      previousMarkedImage: null,
      showSnackbar: false,
      snackbarMsg: '',
      markedImageOpen: false,
      productDialogOpen: false,
      dialogs: {
        pinnedImage: null,
        attachment: null
      },
      loading: true,
    };

    this.firebase = new FirebaseList('entries');
    this.handleMarkedImageClickOpen = this.handleMarkedImageClickOpen.bind(this);
    this.handleMarkedImageClose = this.handleMarkedImageClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onMarkedPositionUpdate = this.onMarkedPositionUpdate.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleProductFormSubmit = this.handleProductFormSubmit.bind(this);
    this.handleProductFormEdit = this.handleProductFormEdit.bind(this);
    this.toggleProductFormOpen = this.toggleProductFormOpen.bind(this);
    this.toggleProductFormClose = this.toggleProductFormClose.bind(this);
    this.toggleProductEdit = this.toggleProductEdit.bind(this);
    this.onFileUploadSuccess = this.onFileUploadSuccess.bind(this);
    this.handleDialogShow = this.handleDialogShow.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    this.firebase.db().ref(`entries/${this.props.jobId}/${this.props.entryId}`).on('value', (snap) => {
      const entry = {
        id: snap.key,
        ...snap.val()
      };
      this.setState({
        currentEntry: entry,
        originalCurrentEntry: {...entry},
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

  toggleEdit = cancel => {
    this.setState({isEditing: !this.state.isEditing});
    if (cancel) {
      this.setState({currentEntry: this.state.originalCurrentEntry})
    }
  };

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

  onMarkedPositionUpdate = position => {
    const updatedMarkedImage = {
      ...this.state.currentEntry.selectedMarkedImage,
      'position': position
    };
    const updatedCurrentEntry = {
      ...this.state.currentEntry,
      'selectedMarkedImage': updatedMarkedImage
    };
    this.setState({currentEntry: updatedCurrentEntry});
  };

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

  handleMarkedImageClickOpen = () => {
    this.setState({
      markedImageOpen: true,
      previousMarkedImage: {...this.state.currentEntry.selectedMarkedImage}
    })
  };

  handleMarkedImageClose = saved => {
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

  handleDialogShow = (item, group) => {
    const updatedDialogState = {
      ...this.state.dialogs,
      [group]: item
    };
    this.setState({ dialogs: updatedDialogState })
  };

  handleDialogClose = group => {
    const updatedDialogState = {
      ...this.state.dialogs,
      [group]: null
    };
    this.setState({ dialogs: updatedDialogState })
  };

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

  onFileUploadSuccess = file => {
    const updatedSelectedUploads = [...this.state.currentEntry.selectedUploads, file];
    const updatedEntryStatus = {
      ...this.state.currentEntry,
      selectedUploads: updatedSelectedUploads
    };
    this.setState({ currentEntry: updatedEntryStatus });
  };

  render() {
    const {classes} = this.props;
    if (this.state.loading || this.state.currentEntry === null) {
      return <Spinner/>
    } else {
      return (
        <div className={classes.wrapper}>
          <EntryActions isEditing={this.state.isEditing}
                        jobId={this.props.jobId}
                        toggleEdit={this.toggleEdit}
                        handleEdit={this.handleEdit}/>
          <ViewEntryDetails {...this.state.currentEntry}
                            handleMarkedImageClickOpen={this.handleMarkedImageClickOpen}
                            isEditing={this.state.isEditing}
                            handleInputChange={this.handleInputChange}/>
          <ViewUpdateLog updateLog={this.state.updateLog} />
          {this.state.currentEntry.hasOwnProperty('selectedUploads') &&
          <ViewImageGrid attachment={this.state.currentEntry.selectedUploads}
                         isEditing={this.state.isEditing}
                         handleDialogShow={(file) => this.handleDialogShow(file, ViewEntryDialogOptions.ATTACHMENT)}
                         handleRequestDeleteChip={this.handleRequestDeleteChip}
                         onFileUploadSuccess={this.onFileUploadSuccess}
          />}
          <ViewProducts products={this.state.currentEntry.selectedProducts}
                        isEditing={this.state.isEditing}
                        toggleProductFormOpen={this.toggleProductFormOpen}
                        toggleEdit={this.toggleProductEdit}/>

          <JobAttachmentDialog handleRequestClose={() => this.handleDialogClose(ViewEntryDialogOptions.ATTACHMENT)}
                               attachment={this.state.dialogs.attachment}/>
          <CreateProductForm open={this.state.productDialogOpen}
                             handleRequestClose={this.toggleProductFormClose}
                             products={this.state.availableProducts}
                             handleInputChange={this.handleProductFormInputChange}
                             handleSubmit={this.handleProductFormSubmit}
                             handleEdit={this.handleProductFormEdit}
                             isEditing={this.state.productIsEditing}
                             {...this.state.currentProduct} />
          <PinnedImageDialog handleRequestClose={this.handleMarkedImageClose}
                             attachment={this.state.markedImageOpen && this.state.currentEntry.selectedMarkedImage}
                             onMarkedPositionUpdate={this.onMarkedPositionUpdate}
                             saveMarkedImage={this.saveMarkedImage}
                             isEditing={this.state.isEditing}
                             previous={this.state.previousMarkedImage}
                             otherMarkedEntries={this.state.otherMarkedEntries}
          />
          <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                          handleSnackbarClose={this.handleSnackbarClose}
                          snackbarMsg={this.state.snackbarMsg}
          />
        </div>
      )
    }
  }
}

export default withStyles(styles)(Entry);

