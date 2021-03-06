import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import ListCompaniesTable from "../../components/admin/companies/listCompaniesTable";
import CreateCompanyForm from "../../components/admin/companies/createCompanyForm";
import {findItemById} from "../../utils/utils";
import SimpleSnackbar from '../../components/shared/snackbar';
import {FirebaseList} from "../../utils/firebase/firebaseList";
import AddButton from "../../components/shared/addButton";
import WithFirebaseListData from "../../HOCs/loadFirebaseListData";

const initialFormState = {
  name: '',
  contactNumber: '',
  email: '',
  address1: '',
  address2: '',
  address3: '',
  county: '',
  notes: ''
};

const initialFormErrorState = {
  nameError: '',
  contactNumberError: '',
  emailError: ''
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

const LIST_NAME = 'companies';

class Companies extends Component {
  constructor() {
    super();
    this.state = {
      createCompanyVisible: false,
      open: false,
      showSnackbar: false,
      snackbarMsg: '',
      search: '',
      isEditting: false,
      currentCompany: initialFormState,
      formErrors: initialFormErrorState
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

    this.firebase = new FirebaseList(LIST_NAME);
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.push(this.state.currentCompany)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Company created");
          this.setState({currentCompany: initialFormState})
        })
    }
  };

  handleEdit(e) {
    e.preventDefault();
    const err = this.validate();
    if(!err) {
      this.firebase.update(this.state.currentCompany.id, this.state.currentCompany)
        .then(() => {
          this.handleRequestClose();
          this.handleSnackbarShow("Company updated");
        })
    }
  }

  handleRemove = (id) => {
    this.setState({currentCompany: initialFormState});
    this.firebase.remove(id)
      .then(() => {
        this.handleRequestClose();
        this.handleSnackbarShow("Company deleted");
      })
  };

  validate() {
    const errors = {...initialFormErrorState};
    let isError = false;

    if(this.state.currentCompany.name === '' ||
      (this.props.companies.findIndex(company => company.name === this.state.currentCompany.name) !== -1 && !this.state.isEditting)) {
      errors.nameError = "Invalid company name or the company already exists";
      isError = true
    }
    if(this.state.currentCompany.contactNumber === '') {
      errors.contactNumberError = "Company phone number cannot be empty";
      isError = true;
    }
    if(this.state.currentCompany.email === '') {
      errors.emailError = "Company email cannot be empty";
      isError = true;
    }

    this.setState({formErrors: errors});

    return isError
  }

  handleInputChange = name => e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    this.setState({ currentCompany: { ...this.state.currentCompany, [name]: value } });
  };

  toggleEdit(id){
    const editingCompany = findItemById(this.props.companies, id);
    this.setState({
      currentCompany: editingCompany,
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
      currentCompany: initialFormState,
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


  render() {
    let filteredCompanies = this.props.companies.filter(
      (company) => {
        return company.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
        <div>
          <AddButton tooltip="Create new user" handleClick={this.handleClickOpen}/>
          <TextField
            value={this.state.search}
            onChange={this.updateSearch}
            id="search"
            label="Search companies"
            className={styles.textField}
            type="search"
            margin="normal"/>
        </div>
        <ListCompaniesTable companies={filteredCompanies} toggleEdit={this.toggleEdit}/>
        <SimpleSnackbar showSnackbar={this.state.showSnackbar}
                        handleSnackbarClose={this.handleSnackbarClose}
                        snackbarMsg={this.state.snackbarMsg}
        />
        <CreateCompanyForm handleSubmit={this.handleSubmit}
                           handleEdit={this.handleEdit}
                           handleRemove={this.handleRemove}
                           isEditting={this.state.isEditting}
                           handleInputChange={this.handleInputChange}
                           {...this.state.currentCompany}
                           {...this.state.formErrors}
                           open={this.state.open}
                           handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default WithFirebaseListData(LIST_NAME)(Companies);

