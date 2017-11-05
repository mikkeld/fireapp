import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import {loadJobs, updateJob, createJob, deleteJob, uploadFile} from "../../utils/jobsService";
import {findUserById, updatedUsers, removeUser} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';
import {loadCompanies} from "../../utils/companyService";
import {loadUsers} from "../../utils/userService";
import CreateJob from "../../components/jobs/createJob";
import {loadProducts} from "../../utils/productService";
import ListJobsTable from "../../components/jobs/listJobsTable";

const initialFormState = {
  id: 0,
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
  status: 'active',
  notes: '',
  productPrice: '',
  clientPrice: ''
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
          createJobVisible: false,
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
    this.handleFileUpload= this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    loadJobs()
      .then(jobs => this.setState({jobs: jobs}));

    loadCompanies()
      .then(companies => this.setState({availableCompanies: companies}));

    loadUsers()
      .then(users => this.setState({availableUsers: users}));

    loadProducts()
      .then(products => this.setState({availableProducts: products}))
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      const newJob = {
        ...this.state.currentJob,
        id: this.generateRandom()
      };

      const updatedJobs = [...this.state.jobs, newJob];
      this.setState({
        jobs: updatedJobs
      });
      createJob(newJob)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Job created");
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.setState({
        jobs: updatedUsers(this.state.jobs, this.state.currentJob)
      });
      updateJob(this.state.currentJob)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Job updated");
        })
    }
  }

  handleRemove = (id) => {
    const updated = removeUser(this.state.users, id);
    this.setState({jobs: updated, currentJob: initialFormState});
    deleteJob(id)
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
    const editingJob = findUserById(this.state.jobs, id);
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
    // NEED REFACTORING
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
        const updatedSelectedProducts = [...this.state.currentJob.selectedProducts, this.state.currentJob.currentProduct];
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
    // NEED REFACTORING
    if (group === "client") {
      const updatedSelectedClients = removeUser(this.state.currentJob.selectedClients, data.id);
      const updatedJobStatus = {
        ...this.state.currentJob,
        selectedClients: updatedSelectedClients
      };
      this.setState({currentJob: updatedJobStatus});
    } else if (group === "product") {
      const updatedSelectedProducts = removeUser(this.state.currentJob.selectedProducts, data.id);
      const updatedJobStatus = {
        ...this.state.currentJob,
        selectedProducts: updatedSelectedProducts
      };
      this.setState({currentJob: updatedJobStatus});
    } else if (group === "upload") {
      const updatedSelectedUplods = removeUser(this.state.currentJob.selectedUploads, data.id);
      const updatedJobStatus = {
        ...this.state.currentJob,
        selectedUploads: updatedSelectedUplods
      };
      this.setState({currentJob: updatedJobStatus});
    }
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

