import React, { Component } from 'react';
import CreateEntryForm from "../../components/entries/createEntryForm";
import { withStyles } from 'material-ui/styles';
import {loadJobFromId, uploadFile} from "../../utils/jobsService";
import ViewImageDialog from "../../components/entries/viewImageDialog";
import {createEntry} from "../../utils/entriesService";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit*2,
  }
});

const initialFormState = {
  id: 0,
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
  jobIdError: '',
};

class CreateEntry extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      job: null,
      currentEntry: initialFormState,
      uploadLoading: false,
      markedImageLoaded: false,
      attachmentDialogOpen: false,
      openAttachment: null,
      markerPosition: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleAttachmentDialogOpen = this.handleAttachmentDialogOpen.bind(this);
    this.saveMarkedImage = this.saveMarkedImage.bind(this);
    this.handleMarkedImageLoaded = this.handleMarkedImageLoaded.bind(this);
  }

  componentDidMount() {
    loadJobFromId(this.props.match.params.id)
      .then(job => {this.setState({job: job})})
  }

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    // if(this.state.currentEntry.jobName === '') {
    //   errors.jobNameError = "Job name cannot be empty";
    //   isError = true;
    // }

    this.setState({formErrors: errors});

    return isError
  }

  handleSubmit() {
    console.log("submit clicked")
    const err = this.validate();
    if(!err) {
      const newEntry = {
        ...this.state.currentEntry,
        id: this.generateRandom()
      };
      if(this.state.job && this.state.currentEntry) {
        createEntry(this.state.job.jobId, newEntry)
          .then(res => console.log("Entry created"));
      }
    }
  };


  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

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
        currentProduct: null
      };
      this.setState({currentEntry: updatedEntryStatus});
    }
  };

  // handleRequestDeleteChip = (data) => {
  //   const updatedSelectedClients = removeUser(this.state.currentJob.selectedClients, data.id);
  //   const updatedJobStatus = {
  //     ...this.state.currentJob,
  //     selectedClients: updatedSelectedClients
  //   };
  //   this.setState({currentJob: updatedJobStatus});
  // };

  handleFileUpload(e) {
    this.setState({uploadLoading: true});
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    uploadFile(formData)
      .then(publicUrl => {
        if(publicUrl.status === 200) {
          const uploadItem = {"name": file.name, "url": publicUrl.data, "id": this.generateRandom()};
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

  generateRandom() {
    return parseInt(Math.random());
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
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
                         products={this.state.products}
                         currentEntry={this.state.currentEntry}
                         addSelectedChip={this.addSelectedChip}
                         handleFileUpload={this.handleFileUpload}
                         job={this.state.job}
                         uploadLoading={this.state.uploadLoading}
                         handleAttachmentDialogOpen={this.handleAttachmentDialogOpen}
                         markerPosition={this.props.markerPosition}
                         attachment={this.props.attachment}
                         markedImageLoaded={this.state.markedImageLoaded}
                         handleMarkedImageLoaded={this.handleMarkedImageLoaded}
                         {...this.state.currentEntry}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CreateEntry);
