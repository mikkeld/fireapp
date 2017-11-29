import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {calculateCost, uploadFile} from "../../utils/jobsService";
import {findItemById, updatedItems, removeItem, snapshotToArray, generateFilename} from "../../utils/utils";
import SimpleSnackbar from '../../components/shared/snackbar';
import CreateJob from "../../components/jobs/createJob";
import ListJobsTable from "../../components/jobs/listJobsTable";
import {FirebaseList} from "../../utils/firebase/firebaseList";
import AddButton from "../../components/shared/addButton";
import Spinner from "../../components/shared/spinner";
import firebase from 'firebase';
import { withStyles } from 'material-ui/styles';

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
		<ListJobsTable jobs={props.filteredJobs} toggleEdit={props.toggleEdit}/>
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
					message: '',
					search: '',
					isEditting: false,
					currentJob: initialFormState,
					formErrors: initialFormErrorState,
					availableCompanies: [],
					availableUsers: [],
					availableProducts: [],
					uploadLoading: false,
					jobsLoading: true,
					usersLoading: true,
					companiesLoading: true,
					productsLoading: true,
					progress: 0,
				};

		this.firebase = new FirebaseList('jobs');

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleEdit= this.handleEdit.bind(this);
		this.handleRemove= this.handleRemove.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
	}

	componentDidMount() {
		const previousJobs = this.state.jobs;

		this.firebase.databaseSnapshot('jobs').then((snap) => {
			if (snap.val() === null) {
				this.setState({jobsLoading: false})
			}
		});

		this.firebase.database.on('child_added', snap => {
			this.firebase.databaseSnapshot(`entries/${snap.key}`).then((entrySnap) => {
				const entries = snapshotToArray(entrySnap);
				const jobStats = this.calculateCostPerJob(snap.val(), entries);
				previousJobs.push({
					id: snap.key,
					...jobStats,
					...snap.val()
				});
				this.setState({
					jobs: previousJobs,
					jobsLoading: false
				})
			});

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
			if (snap.val() === null) {
				this.setState({companiesLoading: false})
			}
			const companies = snapshotToArray(snap);
			this.setState({
				availableCompanies: companies,
				companiesLoading: false
			})
		});
		this.firebase.databaseSnapshot('users').then((snap) => {
			if (snap.val() === null) {
				this.setState({usersLoading: false})
			}
			const users = snapshotToArray(snap);
			this.setState({
				availableUsers: users,
				usersLoading: false
			})
		});
		this.firebase.databaseSnapshot('products').then((snap) => {
			if (snap.val() === null) {
				this.setState({productsLoading: false})
			}
			const products = snapshotToArray(snap);
			this.setState({
				availableProducts: products,
				productsLoading: false
			})
		});
	}

	saveAttachments(attachments, jobId) {
    for (let attachment of attachments) {
      let NewAttachmentRef = this.firebase.db().ref(`attachments/${jobId}`).push();
      NewAttachmentRef.set(attachment)
    }
	}

	handleSubmit(e) {
		e.preventDefault();
		const err = this.validate();
		if(!err) {
			this.firebase.push(this.state.currentJob)
				.then((key) => {
			    if (this.state.currentJob.selectedUploads.length !== 0) {
			      this.saveAttachments(this.state.currentJob.selectedUploads, key)
          }
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
			(this.state.jobs.findIndex(job => job.jobId === this.state.currentJob.jobId) !== -1 && !this.state.isEditting)) {
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
		const editingJob = findItemById(this.state.jobs, id);
		this.setState({
			currentJob: editingJob,
			isEditting: true,
			open: true
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

	filterProducts(selected, available) {
		if(!this.state.productsLoading) {
			const selectedProductNames = [];
			selected.forEach(product => selectedProductNames.push(product.name));
			return available.filter(product => !selectedProductNames.includes(product.name))
		}
	}

	filterClients(selected, available) {
		if(!this.state.usersLoading) {
			const selectedClientNames = [];
			selected.forEach(client => selectedClientNames.push(client.name));
			return available.filter(client => !selectedClientNames.includes(client.name))
		}
	}

	calculateCostPerJob = (job, entries) => {
		let jobStats = {
			totalCost: 0,
			latestEntry: null
		};
		for (let entry of entries) {
			if (entry.creationDate > jobStats.latestEntry) {
				jobStats.latestEntry = entry.creationDate;
			}
			if (entry && entry.selectedProducts) {
				if (entry.creationDate < job.lastPushedToClient) {
					for (let product of entry.selectedProducts) {
						jobStats.totalCost += calculateCost(product, "client");
					}
				}
			}
		}
		return jobStats
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
			const uploadItem = {"name": getNameString(filename), "url": url};
			const updatedSelectedUploads = [...this.state.currentJob.selectedUploads, uploadItem];
			const updatedJobStatus = {
				...this.state.currentJob,
				selectedUploads: updatedSelectedUploads
			};
			this.setState({
				uploadLoading: false,
				currentJob: updatedJobStatus
			});
		});
	};

	render() {
		const {classes} = this.props;
		let filteredJobs = this.state.jobs.filter(
			(job) => {
				return job.jobName.toLowerCase().indexOf(
					this.state.search.toLowerCase()) !== -1;
			}
		);
		let filteredProducts = this.filterProducts(this.state.currentJob.selectedProducts, this.state.availableProducts);
		let filteredClients = this.filterClients(this.state.currentJob.selectedClients, this.state.availableUsers);

		if (this.state.jobsLoading || this.state.companiesLoading || this.state.usersLoading || this.state.productsLoading) {
			return <Spinner/>
		} else {
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
												 uploadLoading={this.state.uploadLoading}
												 handleUploadStart={this.handleUploadStart}
												 handleProgress={this.handleProgress}
												 handleUploadError={this.handleUploadError}
												 handleUploadSuccess={this.handleUploadSuccess}
												 firebaseStorage={firebase.storage().ref('images')}
												 filename={file => generateFilename(file)}
						/>
						: <JobsMainPage search={this.state.search}
														updateSearch={this.updateSearch}
														handleClickOpen={this.handleClickOpen}
														toggleEdit={this.toggleEdit}
														filteredJobs={filteredJobs}
														classes={classes}
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
}

export default withStyles(styles)(Jobs);