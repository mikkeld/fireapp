import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import {uploadFile} from "../../utils/jobsService";
import {findItemById, updatedItems, removeItem, snapshotToArray} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';
import CreateJob from "../../components/jobs/createJob";
import ListJobsTable from "../../components/jobs/listJobsTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";

const initialFormState = {
  jobId: '',
  jobName: '',
  startDate: '',
  buildingName: '',
  address1: '',
  address2: '',
  selectedCompany: null,
  selectedClients: [],
  currentClient: null,
  selectedProducts: [],
  currentProduct: null,
  selectedUploads: [],
  notes: '',
  productPrice: '',
  clientPrice: '',
  completed: false
};

const initialFormErrorState = {
  jobIdError: '',
  jobNameError: '',
  startDateError: '',
  buildingNameError: '',
  selectedCompanyError: '',
  selectedClientsError: '',
  selectedProductsError: ''
};

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
});

export class Jobs extends Component {
      constructor() {
        super();
        this.state = {
          jobs: [],
          open: false,
          showSnackbar: false,
          snackbarMsg: '',
          message: '',
          search: '',
          isEditting: false,
          currentJob: initialFormState,
          formErrors: initialFormErrorState,
          availableCompanies: [],
          availableUsers: [],
          availableProducts: [],
          uploadLoading: false
        };

    this.firebase = new FirebaseList('jobs');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
    this.handleFileUpload= this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    const previousJobs = this.state.jobs;

    this.firebase.database.on('child_added', snap => {
      previousJobs.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        jobs: previousJobs
      })
    });

    this.firebase.database.on('child_changed', snap => {
      const updatedJobs = updatedItems(this.state.jobs, this.state.currentJob);
      this.setState({
        jobs: updatedJobs
      })
    });

    this.firebase.database.on('child_removed', snap => {
      const updatedJobs = removeItem(previousJobs, snap.key);
      this.setState({
        jobs: updatedJobs
      })
    });

    this.firebase.databaseSnapshot('companies').then((snap) => {
      const companies = snapshotToArray(snap);
      this.setState({availableCompanies: companies})
    });
    this.firebase.databaseSnapshot('users').then((snap) => {
      const users = snapshotToArray(snap);
      this.setState({availableUsers: users})
    });
    this.firebase.databaseSnapshot('products').then((snap) => {
      const products = snapshotToArray(snap);
      this.setState({availableProducts: products})
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.push(this.state.currentJob)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Job created");
          this.setState({currentJob: initialFormState})
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.update(this.state.currentJob.id, this.state.currentJob)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Job updated");
        })
    }
  }

  handleRemove = (id) => {
    this.setState({currentJob: initialFormState});
    this.firebase.remove(id)
      .then(() => {
        this.handleRequestClose();
        this.handleSnackbarShow("Job deleted");
      })
  };

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentJob.jobId === '' ||
      (this.state.jobs.findIndex(job => job.jobId === this.state.currentJob.jobId) !== -1 && !this.state.isEditting)) {
      errors.jobIdError = "Invalid Job Id or the Job Id already exists";
      isError = true
    }
    if(this.state.currentJob.jobName === '') {
      errors.jobNameError = "Job name cannot be empty";
      isError = true;
    }
    // if(this.state.currentJob.startDate === '') {
    //   errors.startDateError = "Start Date cannot be empty";
    //   isError = true;
    // }
    if(this.state.currentJob.buildingName === '') {
      errors.buildingNameError = "Building name cannot be empty";
      isError = true;
    }
    if(this.state.currentJob.selectedCompany === null) {
      errors.selectedCompanyError = "You must select a company";
      isError = true;
    }
    if(this.state.currentJob.selectedClients.length === 0) {
      errors.selectedClientsError = "You must select at least one client";
      isError = true;
    }
    if(this.state.currentJob.selectedProducts.length === 0) {
      errors.selectedProductsError = "You must select at least one product";
      isError = true;
    }

    this.setState({formErrors: errors});

    return isError
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentJob: { ...this.state.currentJob, [name]: value } });
  };

  toggleEdit(id){
    const editingJob = findItemById(this.state.jobs, id);
    this.handleClickOpen();
    this.setState({
      currentJob: editingJob,
      isEditting: true
    });
  }

  generateRandom() {
    return parseInt(Math.random());
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({search: e.target.value});
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      currentJob: initialFormState,
      formErrors: initialFormErrorState
    });
  };

  handleSnackbarShow = (msg) => {
    this.setState({
      showSnackbar: true,
      snackbarMsg: msg
    });
  };

  handleSnackbarClose= (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showSnackbar: false });
  };

  addSelectedChip = (group) => {
    if (group === "client") {
      if (this.state.currentJob.currentClient) {
        const updatedSelectedClients = [...this.state.currentJob.selectedClients, this.state.currentJob.currentClient];
        const updatedJobStatus = {
          ...this.state.currentJob,
          selectedClients: updatedSelectedClients,
          currentClient: null
        };

        this.setState({currentJob: updatedJobStatus});
      }
    } else if (group === "product") {
      if (this.state.currentJob.currentProduct) {
        const updatedCurrentProduct = {
          ...this.state.currentJob.currentProduct,
          'productPrice': this.state.currentJob.productPrice,
          'clientPrice': this.state.currentJob.clientPrice,
        };
        const updatedSelectedProducts = [...this.state.currentJob.selectedProducts, updatedCurrentProduct];
        const updatedJobStatus = {
          ...this.state.currentJob,
          selectedProducts: updatedSelectedProducts,
          currentProduct: null
        };
        this.setState({currentJob: updatedJobStatus});
      }
    }
  };

  handleRequestDeleteChip = (data, group) => {
    const itemToChange = new Map([['client', 'selectedClients'], ['product', 'selectedProducts'], ['upload', 'selectedUploads']]);
    const selected = itemToChange.get(group);
    const updatedSelectedClients = removeItem(this.state.currentJob[selected], data.id);
    const updatedJobStatus = {
      ...this.state.currentJob,
      [selected]: updatedSelectedClients
    };
    this.setState({currentJob: updatedJobStatus});
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
          const uploadItem = {"name": file.name, "url": publicUrl.data, "id": this.generateRandom()};
          const updatedSelectedUploads = [...this.state.currentJob.selectedUploads, uploadItem];
          const updatedJobStatus = {
            ...this.state.currentJob,
            selectedUploads: updatedSelectedUploads
          };
          this.setState({
            uploadLoading: false,
            currentJob: updatedJobStatus
          })

        } else {
          console.log("error uploading image");
        }
      });
  }


  render() {
    let filteredJobs = this.state.jobs.filter(
      (job) => {
        return job.jobName.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    const JobsMainPage = () => (
      <div>
        <Button color="primary"
                onClick={() => {this.handleClickOpen(); this.setState({isEditting: false})}}>
          Create Job
        </Button>
        <TextField
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
          id="search"
          label="Search jobs"
          className={styles.textField}
          type="search"
          margin="normal"/>
        <ListJobsTable jobs={filteredJobs} toggleEdit={this.toggleEdit}/>
      </div>
    );

    return (

      <div>
        <h1>Jobs</h1>
        {this.state.open
          ? <CreateJob handleSubmit={this.handleSubmit}
                       handleEdit={this.handleEdit}
                       handleRemove={this.handleRemove}
                       isEditting={this.state.isEditting}
                       handleInputChange={this.handleInputChange}
                       {...this.state.currentJob}
                       {...this.state.formErrors}
                       availableCompanies={this.state.availableCompanies}
                       availableUsers={this.state.availableUsers}
                       availableProducts={this.state.availableProducts}
                       open={this.state.open}
                       handleRequestClose={this.handleRequestClose}
                       addSelectedChip={this.addSelectedChip}
                       handleRequestDeleteChip={this.handleRequestDeleteChip}
                       handleFileUpload={this.handleFileUpload}
                       uploadLoading={this.state.uploadLoading}
          />
          : <JobsMainPage />

        }

        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

