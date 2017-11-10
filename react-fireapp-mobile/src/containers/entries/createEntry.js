import React, { Component } from 'react';
import CreateEntryForm from "../../components/entries/createEntryForm";
import { withStyles } from 'material-ui/styles';
import {uploadFile} from "../../utils/jobsService";
import ViewImageDialog from "../../components/entries/viewImageDialog";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import {removeItem} from "../../utils/utils";
import {
  Redirect
} from 'react-router-dom';
import AppBar from "../../components/appBar";
import Spinner from "../../components/shared/spinner";

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
      currentEntry: initialFormState,
      formErrors: initialFormErrorState,
      uploadLoading: false,
      markedImageLoaded: false,
      attachmentDialogOpen: false,
      openAttachment: null,
      markerPosition: null,
      redirect: false,
      loading: true,
      isEditing: false
    };

    this.firebase = new FirebaseList('entries');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleAttachmentDialogOpen = this.handleAttachmentDialogOpen.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
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
    if (this.entryId) {
      this.firebase.databaseSnapshot(`entries/${this.jobId}/${this.entryId}`).then((entry) => {
        const updatedEntry = Object.assign(initialFormState, entry.val());
        this.setState({
          currentEntry: updatedEntry,
          isEditing: !!this.entryId
        })
      });
    }
    console.log(this.props.match.params.entry)
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
      const newEntry = {
        ...this.state.currentEntry,
        'lastUpdated': Date.now()
      };
      if(this.state.job && this.state.currentEntry) {
        if(!this.state.isEditing) {
          this.firebase.push(newEntry)
            .then(() => this.setState({redirect: 'create'}));
        } else {
          this.firebase.update(this.entryId, newEntry)
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
                               markerPosition={this.state.markerPosition}
                               saveMarkedImage={this.saveMarkedImage}
                               markedImageLoaded={this.state.markedImageLoaded}
                               handleMarkedImageLoaded={this.handleMarkedImageLoaded}
              />

              <CreateEntryForm handleInputChange={this.handleInputChange}
                               handleSubmit={this.handleSubmit}
                               availableProducts={filteredProducts}
                               currentEntry={this.state.currentEntry}
                               addSelectedChip={this.addSelectedChip}
                               handleRequestDeleteChip={this.handleRequestDeleteChip}
                               handleFileUpload={this.handleFileUpload}
                               job={this.state.job}
                               uploadLoading={this.state.uploadLoading}
                               handleAttachmentDialogOpen={this.handleAttachmentDialogOpen}
                               markerPosition={this.props.markerPosition}
                               attachment={this.props.attachment}
                               markedImageLoaded={this.state.markedImageLoaded}
                               handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                               isEditing={this.state.isEditing}
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
