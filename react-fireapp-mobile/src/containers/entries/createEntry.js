import React, { Component } from 'react';
import CreateEntryForm from "../../components/entries/createEntryForm";
import { withStyles } from 'material-ui/styles';
import ViewImageDialog from "../../components/entries/viewImageDialog";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import {generateFilename, removeItem, snapshotToArray} from "../../utils/utils";
import {
  Redirect
} from 'react-router-dom';
import AppBar from "../../components/appBar";
import Spinner from "../../components/shared/spinner";
import firebase from 'firebase';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit*2,
  }
});

const initialFormState = {
  currentProduct: null,
  selectedProducts: [],
  selectedUploads: [],
  selectedMarkedImage: null,
  productQuantity: '',
  locationDescription: '',
  comments: '',
  currentUpload: null,
  username: 'emoore'
};

const initialFormErrorState = {
  selectProductError: '',
};

class CreateEntry extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      job: null,
      currentEntry: {...initialFormState},
      formErrors: initialFormErrorState,
      uploadLoading: false,
      markedImageLoaded: false,
      attachmentDialogOpen: false,
      openAttachment: null,
      markerPosition: null,
      availableAttachments: [],
      entries: [],
      redirect: false,
      loading: true,
      isEditing: false,
      otherMarkedEntries: []
    };

    this.firebase = new FirebaseList('entries');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleAttachmentDialogOpen = this.handleAttachmentDialogOpen.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  componentDidMount() {
    this.firebase.path = `entries/${this.props.match.params.id}`;
    this.jobId = this.props.match.params.id;
    this.entryId = this.props.match.params.entry || null;
    this.firebase.db().ref(`jobs/${this.props.match.params.id}`).on('value', (snap) => {
      const job = {
        id: snap.key,
        ...snap.val()
      };
      this.setState({
        job: job,
        loading: false,
      })
    });
    this.firebase.databaseSnapshot(`attachments/${this.jobId}`).then((snap) => {
      const attachments = snapshotToArray(snap);
      this.setState({availableAttachments: attachments})
    });
    this.firebase.databaseSnapshot(`entries/${this.jobId}`).then((snap) => {
      const entries = snapshotToArray(snap);
      const otherMarkedEntries = entries.filter(entry => entry.id !== this.entryId);
      this.setState({otherMarkedEntries: otherMarkedEntries})
    });
    if (this.entryId) {
      this.firebase.databaseSnapshot(`entries/${this.jobId}/${this.entryId}`).then((entry) => {
        const updatedEntry = Object.assign({...initialFormState}, entry.val());
        this.setState({
          currentEntry: updatedEntry,
          isEditing: !!this.entryId
        })
      });
    }
  }

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentEntry.selectedProducts.length === 0) {
      errors.selectProductError = "You must select at least one product";
      isError = true;
    }

    this.setState({formErrors: errors});

    return isError
  }

  handleSubmit() {
    const err = this.validate();
    if(!err) {
      if(this.state.job && this.state.currentEntry) {
        if(!this.state.isEditing) {
          const newEntry = {
            ...this.state.currentEntry,
            'creationDate': Date.now()
          };
          let newEntryRef = this.firebase.db().ref(`entries/${this.jobId}`).push();
          newEntryRef.set(newEntry);
          if (this.state.currentEntry.selectedMarkedImage !== null) {
            this.firebase.db().ref(`attachments/${this.jobId}/${newEntry.currentUpload.id}/markings/${newEntryRef.key}`)
              .set(this.state.currentEntry.selectedMarkedImage)
          }
          this.setState({redirect: 'create'});
        } else {
          const updatedEntry = {
            ...this.state.currentEntry
          };
          const newLogEntry = {
            'lastUpdated': Date.now(),
            'updatedBy': 'emoore'
          };
          this.firebase.db().ref(`log/${this.jobId}/${this.entryId}`).push(newLogEntry);
          this.firebase.update(this.entryId, updatedEntry)
            .then(() => this.setState({redirect: 'edit'}));
        }
      }
    }
  };

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (name === 'currentUpload') {
      this.handleAttachmentDialogOpen(this.state.job.selectedUploads);
    }

    this.setState({ currentEntry: { ...this.state.currentEntry, [name]: value } });
  };

  addSelectedChip = () => {
    if (this.state.currentEntry.currentProduct) {
      const updatedCurrentProduct = {
        ...this.state.currentEntry.currentProduct,
        'productQuantity': this.state.currentEntry.productQuantity
      };
      const updatedSelectedProducts = [...this.state.currentEntry.selectedProducts, updatedCurrentProduct];
      const updatedEntryStatus = {
        ...this.state.currentEntry,
        selectedProducts: updatedSelectedProducts,
        currentProduct: null,
        productQuantity: ''
      };
      this.setState({currentEntry: updatedEntryStatus});
    }
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

  handleAttachmentDialogOpen = (attachment) => {
    this.setState({
      attachmentDialogOpen: true,
      openAttachment: attachment
    });
  };

  handleAttachmentDialogClose =() => {
    this.setState({attachmentDialogOpen: false})
  };

  saveMarkedImage() {
    const markedImage = {
      'attachment': this.state.openAttachment[0],
      'position': this.state.markerPosition
    };
    const updatedCurrentEntry = {
      ...this.state.currentEntry,
      'selectedMarkedImage': markedImage
    };
    this.setState({
      currentEntry: updatedCurrentEntry
    });
    this.handleAttachmentDialogClose()
  }

  setMarker(e) {
    const dim = e.target.getBoundingClientRect();
    const position = {
      'pageX': e.pageX - dim.left -25,
      'pageY': e.pageY - dim.top - 50
    };
    this.setState({markerPosition: position});
  }

  handleMarkedImageLoaded() {
    this.setState({markedImageLoaded: true})
  }

  filterProducts(selected, available) {
    if(this.state.job) {
      const selectedProductNames = [];
      selected.forEach(product => selectedProductNames.push(product.name));
      return available.filter(product => !selectedProductNames.includes(product.name))
    }
  }

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
    const {classes} = this.props;
    const filteredProducts = this.filterProducts(this.state.currentEntry.selectedProducts, this.state.job && this.state.job.selectedProducts);
    const title = this.state.isEditing ? "Edit entry for" : "Add entry for";
    const redirectRoute = this.state.redirect
      ? `/entries/${this.props.match.params.id}/${this.state.redirect}`
      : `/entries/${this.props.match.params.id}`;
    return (
      <section>
        <AppBar title={`${title} ${this.state.job && this.state.job.jobId}`} route={`/entries/${this.props.match.params.id}`}/>
        {this.state.loading
          ? <Spinner />
          : <div className={classes.root}>
              <ViewImageDialog open={this.state.attachmentDialogOpen}
                               handleRequestClose={this.handleAttachmentDialogClose}
                               attachment={this.state.currentEntry.currentUpload}
                               setMarker={this.setMarker}
                               markerPosition={this.state.markerPosition || this.state.currentEntry.selectedMarkedImage && this.state.currentEntry.selectedMarkedImage.position}
                               saveMarkedImage={this.saveMarkedImage}
                               markedImageLoaded={this.state.markedImageLoaded}
                               handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                               otherMarkedEntries={this.state.otherMarkedEntries}
              />
              <CreateEntryForm handleInputChange={this.handleInputChange}
                               handleSubmit={this.handleSubmit}
                               availableProducts={filteredProducts}
                               addSelectedChip={this.addSelectedChip}
                               handleRequestDeleteChip={this.handleRequestDeleteChip}
                               job={this.state.job}
                               availableAttachments={this.state.availableAttachments}
                               uploadLoading={this.state.uploadLoading}
                               handleAttachmentDialogOpen={this.handleAttachmentDialogOpen}
                               markedImageLoaded={this.state.markedImageLoaded}
                               handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                               isEditing={this.state.isEditing}
                               handleProgress={this.handleProgress}
                               handleUploadError={this.handleUploadError}
                               handleUploadSuccess={this.handleUploadSuccess}
                               firebaseStorage={firebase.storage().ref('images')}
                               filename={file => generateFilename(file)}
                               otherMarkedEntries={this.state.otherMarkedEntries}
                               {...this.state.currentEntry}
                               {...this.state.formErrors}
              />
              {this.state.redirect && <Redirect to={redirectRoute} push />}
            </div>}
      </section>
    );
  }
}

export default withStyles(styles)(CreateEntry);
