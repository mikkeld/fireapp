import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import ListCompaniesTable from "../../components/admin/companies/listCompaniesTable";
import {createCompany, deleteCompany, loadCompanies, updateCompany} from "../../utils/companyService";
import CreateCompanyForm from "../../components/admin/companies/createCompanyForm";
import {findItemById, updatedItems, removeItem} from "../../utils/utils";
import SimpleSnackbar from '../../components/snackbar';
import {FirebaseList} from "../../utils/firebase/firebaseList";

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

export class Companies extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      createCompanyVisible: false,
      open: false,
      showSnackbar: false,
      snackbarMsg: '',
      message: '',
      search: '',
      isEditting: false,
      currentCompany: initialFormState,
      formErrors: initialFormErrorState
    };

    this.firebase = new FirebaseList('companies');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
    this.handleRemove= this.handleRemove.bind(this);
  }

  componentDidMount() {
    const previousCompanies = this.state.companies;

    this.firebase.database.on('child_added', snap => {
      previousCompanies.push({
        id: snap.key,
        ...snap.val()
      });

      this.setState({
        companies: previousCompanies
      })
    });

    this.firebase.database.on('child_changed', snap => {
      const updatedCompanies = updatedItems(this.state.companies, this.state.currentCompany);
      this.setState({
        companies: updatedCompanies
      })
    });

    this.firebase.database.on('child_removed', snap => {
      const updatedCompanies = removeItem(previousCompanies, snap.key);
      this.setState({
        companies: updatedCompanies
      })
    })
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
      (this.state.companies.findIndex(company => company.name === this.state.currentCompany.name) !== -1 && !this.state.isEditting)) {
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
    const editingCompany = findItemById(this.state.companies, id);
    this.handleClickOpen();
    this.setState({
      currentCompany: editingCompany,
      isEditting: true
    });
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
      currentCompany: initialFormState,
      formErrors: initialFormErrorState
    });
    this.props.toggleCreateCompanyOpen && this.props.toggleCreateCompanyOpen()
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
    let filteredCompanies = this.state.companies.filter(
      (company) => {
        return company.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>
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
        <div>
          <h1>Companies</h1>
          <div>
            <Button color="primary"
                    onClick={() => {this.handleClickOpen(); this.setState({isEditting: false})}}>
              Create Company
            </Button>
            <TextField
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
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
        </div>
      </div>
    );
  }
}

