import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {findItemById, removeItem, snapshotToArray} from "../../utils/utils";
import SimpleSnackbar from '../../components/shared/snackbar';
import CreateJob from "../../components/jobs/createJob";
import ListJobsTable from "../../components/jobs/listJobsTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import AddButton from "../../components/shared/addButton";
import { withStyles } from 'material-ui/styles';
import WithFirebaseListData from "../../HOCs/loadFirebaseListData";

const initialFormState = {
	jobId: '',
	jobName: '',
	buildingName: '',
	address1: '',
	address2: '',
	startDate: '',
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

const LIST_NAME = 'jobs';

const JobsMainPage = (props) => (
	<div>
		<AddButton tooltip="Create new job" handleClick={props.handleClickOpen}/>
		<TextField
			value={props.search}
			onChange={props.updateSearch}
			id="search"
			label="Search jobs"
			className={props.classes.textField}
			type="search"
			margin="normal"/>
		<ListJobsTable jobs={props.filteredJobs} toggleEdit={props.toggleEdit} entries={props.entries}/>
	</div>
);

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

class Jobs extends Component {
			constructor() {
				super();
				this.state = {
					jobs: [],
					open: false,
					showSnackbar: false,
					snackbarMsg: '',
					search: '',
					isEditting: false,
					currentJob: initialFormState,
					formErrors: initialFormErrorState,
					availableCompanies: [],
					availableUsers: [],
					availableProducts: [],
					entries: {}
				};

		this.firebase = new FirebaseList(LIST_NAME);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEdit= this.handleEdit.bind(this);
		this.handleRemove= this.handleRemove.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
	}

	componentDidMount() {
    this.firebase.databaseSnapshot('entries').then((snap) => {
      this.setState({
        entries: snap.val()
      })
    });

		this.firebase.databaseSnapshot('companies').then((snap) => {
			const companies = snapshotToArray(snap);
			this.setState({
				availableCompanies: companies
			})
		});
		this.firebase.databaseSnapshot('users').then((snap) => {
			const users = snapshotToArray(snap);
			this.setState({
				availableUsers: users
			})
		});
		this.firebase.databaseSnapshot('products').then((snap) => {
			const products = snapshotToArray(snap);
			this.setState({
				availableProducts: products
			})
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
				});
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
			(this.props.jobs.findIndex(job => job.jobId === this.state.currentJob.jobId) !== -1 && !this.state.isEditting)) {
			errors.jobIdError = "Invalid Job Id or the Job Id already exists";
			isError = true
		}
		if(this.state.currentJob.jobName === '') {
			errors.jobNameError = "Job name cannot be empty";
			isError = true;
		}
		if(this.state.currentJob.startDate === '') {
			errors.startDateError = "Start Date cannot be empty";
			isError = true;
		}
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
		const editingJob = findItemById(this.props.jobs, id);
		this.setState({
			currentJob: editingJob,
			isEditting: true,
			open: true
		});
	}

	updateSearch(e) {
		e.preventDefault();
		this.setState({search: e.target.value});
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
			isEditting: false
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
          currentProduct: null,
					'productPrice': '',
					'clientPrice': '',
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

  filterItems(selected, available, nameProp) {
		const selectedNames = [];
		selected.forEach(item => selectedNames.push(item[nameProp]));
		return available.filter(item => !selectedNames.includes(item[nameProp]))
  }

  onFileUploadSuccess = file => {
    const updatedSelectedUploads = [...this.state.currentJob.selectedUploads, file];
    const updatedJobStatus = {
      ...this.state.currentJob,
      selectedUploads: updatedSelectedUploads
    };
    this.setState({ currentJob: updatedJobStatus });
	};

	render() {
		const {classes} = this.props;
		let filteredJobs = this.props.jobs.filter(
			(job) => {
				return job.jobName.toLowerCase().indexOf(
					this.state.search.toLowerCase()) !== -1;
			}
		);
		let filteredProducts = this.filterItems(this.state.currentJob.selectedProducts, this.state.availableProducts, 'name');
		let filteredClients = this.filterItems(this.state.currentJob.selectedClients, this.state.availableUsers, 'username');

		return (
			<div>
				{this.state.open
					? <CreateJob handleSubmit={this.handleSubmit}
											 handleEdit={this.handleEdit}
											 handleRemove={this.handleRemove}
											 isEditting={this.state.isEditting}
											 handleInputChange={this.handleInputChange}
											 {...this.state.currentJob}
											 {...this.state.formErrors}
											 availableCompanies={this.state.availableCompanies}
											 availableUsers={filteredClients}
											 availableProducts={filteredProducts}
											 open={this.state.open}
											 handleRequestClose={this.handleRequestClose}
											 addSelectedChip={this.addSelectedChip}
											 handleRequestDeleteChip={this.handleRequestDeleteChip}
											 onFileUploadSuccess={this.onFileUploadSuccess}
											 onChipChange={this.onChipChange}
					/>
					: <JobsMainPage search={this.state.search}
													updateSearch={this.updateSearch}
													handleClickOpen={this.handleClickOpen}
													toggleEdit={this.toggleEdit}
													filteredJobs={filteredJobs}
													classes={classes}
													entries={this.state.entries}
					/>
				}

				<SimpleSnackbar showSnackbar={this.state.showSnackbar}
												handleSnackbarClose={this.handleSnackbarClose}
												snackbarMsg={this.state.snackbarMsg}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(WithFirebaseListData(LIST_NAME)(Jobs));