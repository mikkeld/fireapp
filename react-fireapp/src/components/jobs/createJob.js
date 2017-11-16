import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldFirst: {
    marginRight: "4%",
    width: "48%",
  },
  textFieldSecond: {
    width: "48%",
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    overflowX: 'auto',
    align: 'left',
    maxWidth: 700
  },
  table: {
    minWidth: 700,
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
  chipContainer: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  actionSection: {
    float: 'right'
  },
  subHeader: {
    fontStyle: 'italic'
  }
});

const JobDetailFormGroup = (props) => (
  <section className={props.classes.section}>
    <TextField
      error={props.jobIdError !== ''}
      helperText={props.jobIdError || "Example: ES10"}
      autoFocus
      required
      margin="dense"
      id="jobId"
      label="Job ID"
      name="jobid"
      fullWidth
      onChange={props.handleInputChange('jobId')}
      value={props.jobId} />
    <TextField
      error={props.jobNameError !== ''}
      helperText={props.jobNameError || "Example: Spencer Dock"}
      required
      margin="dense"
      id="jobName"
      label="Job Name"
      name="jobName"
      className={props.classes.textFieldFirst}
      onChange={props.handleInputChange('jobName')}
      value={props.jobName} />
    <TextField
      error={props.startDateError !== ''}
      id="date"
      required
      label="Job Start Day"
      type="date"
      helperText={props.startDateError || "Example: 2017/01/01"}
      className={props.classes.textFieldSecond}
      onChange={props.handleInputChange('startDate')}
      value={props.startDate}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      error={props.buildingNameError !== ''}
      helperText={props.buildingNameError || "Example: Spencer Dock"}
      margin="dense"
      required
      id="buildingName"
      label="Building Name"
      name="buildingName"
      className={props.classes.textFieldFirst}
      onChange={props.handleInputChange('buildingName')}
      value={props.buildingName} /><br />
    <TextField
      helperText="Example: Address 1"
      margin="dense"
      id="address1"
      label="Address Line 1"
      name="address1"
      className={props.classes.textFieldFirst}
      onChange={props.handleInputChange('address1')}
      value={props.address1} /><br />
    <TextField
      helperText={"Example: Address 2"}
      margin="dense"
      id="address2"
      label="Address Line 2"
      name="address2"
      className={props.classes.textFieldFirst}
      onChange={props.handleInputChange('address2')}
      value={props.address2} />
    <TextField
      id="notes"
      label="notes"
      multiline
      rows="4"
      value={props.notes}
      onChange={props.handleInputChange('notes')}
      margin="normal"
      fullWidth
    />
  </section>
);

const CompanyFormGroup = (props) => (
  <section className={props.classes.section}>
    <Typography type="subheading" gutterBottom color="secondary" className={props.classes.subHeader}>
      Add a company to the job
    </Typography>
    <Divider />
    <div>
      <TextField
        id="selectedCompany"
        select
        required
        error={props.selectedCompanyError !== ''}
        label="Select a company"
        margin="normal"
        className={props.classes.textFieldFirst}
        value={props.selectedCompany === null ? "" : props.selectedCompany}
        onChange={props.handleInputChange('selectedCompany')}
        SelectProps={{
          MenuProps: {
            className: props.classes.menu,
          },
          name: "selectedCompany"
        }}
        helperText={props.selectedCompanyError || "Example: Company 1"}
      >
        {props.availableCompanies.map((company, index) => (
          <MenuItem key={index} value={company}>
            {company.name}
          </MenuItem>
        ))}
      </TextField><br />
      {props.selectedCompany &&
      <div>
        <TextField
          margin="dense"
          label="Company email"
          id="companyEmail"
          name="companyEmail"
          className={props.classes.textFieldFirst}
          disabled
          value={props.selectedCompany === null ? '' : props.selectedCompany.email} />
        <TextField
          margin="dense"
          label="Company Phone"
          id="companyPhone"
          name="companyPhone"
          className={props.classes.textFieldSecond}
          disabled
          value={props.selectedCompany === null ? '' : props.selectedCompany.contactNumber} />
        <TextField
          margin="dense"
          label="Address Line 1"
          id="companyAddress1"
          name="companyAddress1"
          className={props.classes.textFieldFirst}
          disabled
          value={props.selectedCompany === null ? '' : props.selectedCompany.address1} />
        <TextField
          id="companyNotes"
          label="Company notes"
          className={props.classes.textFieldSecond}
          value={props.selectedCompany === null ? '' : props.selectedCompany.notes}
          disabled
        />
      </div>}
    </div>
  </section>
);

const ClientFormGroup = (props) => (
  <section className={props.classes.section}>
    <Typography type="subheading" gutterBottom color="secondary" className={props.classes.subHeader}>
      Add a client to the job
    </Typography>
    <Divider />
    {props.selectedClients.length > 0 &&
    <div className={props.classes.chipContainer}>
      {props.selectedClients.map(client => {
        return (
          <Chip
            label={client.username}
            key={client.id}
            className={props.classes.chip}
            onRequestDelete={() => props.handleRequestDeleteChip(client, "client")}
          />
        )
      })}
    </div>}
      <div>
        <TextField
          id="selectedUser"
          select
          required
          error={props.selectedClientsError !== ''}
          label="Select a client"
          margin="normal"
          className={props.classes.textFieldFirst}
          value={(props.currentClient === undefined || props.currentClient === null) ? "" : props.currentClient}
          onChange={props.handleInputChange('currentClient')}
          SelectProps={{
            MenuProps: {
              className: props.classes.menu,
            },
            name: "currentClient"
          }}
          helperText={props.selectedClientsError || "Example: Client1"}
        >
          {props.availableUsers.map((user, index) => (
            <MenuItem key={index} value={user}>
              {user.username}
            </MenuItem>
          ))}
        </TextField>
        {props.currentClient &&
        <Button color="primary" onClick={() => props.addSelectedChip("client")}>add client</Button>}
        <br />
        {props.currentClient &&
        <div>
          <TextField
            margin="dense"
            label="Company Name"
            id="userCompanyName"
            name="userCompanyName"
            className={props.classes.textFieldFirst}
            disabled
            value={props.currentClient === null ? '' : props.currentClient.company} />
          <TextField
            margin="dense"
            label="Username"
            id="userUsername"
            name="userUsername"
            className={props.classes.textFieldFirst}
            disabled
            value={props.currentClient === null ? '' : props.currentClient.username} />
          <TextField
            margin="dense"
            label="Email"
            id="userEmail"
            name="userEmail"
            className={props.classes.textField}
            disabled
            value={props.currentClient === null ? '' : props.currentClient.email} />
        </div>}
      </div>
  </section>
);

const ProductFormGroup = (props) => (
  <section className={props.classes.section}>
    <Typography type="subheading" gutterBottom color="secondary" className={props.classes.subHeader}>
      Add a product to the job
    </Typography>
    <Divider/>
    {props.selectedProducts.length > 0 &&
    <div className={props.classes.chipContainer}>
      {props.selectedProducts.map((product, index) => {
        return (
          <Chip
            label={product.name}
            key={index}
            className={props.classes.chip}
            onRequestDelete={() => props.handleRequestDeleteChip(product, "product")}
          />
        )
      })}
    </div>}
      <div>
        <TextField
          id="selectedProduct"
          select
          label="Select a product"
          error={props.selectedProductsError !== ''}
          margin="normal"
          required
          className={props.classes.textFieldFirst}
          value={(props.currentProduct === undefined || props.currentProduct === null) ? "" : props.currentProduct}
          onChange={props.handleInputChange('currentProduct')}
          SelectProps={{
            MenuProps: {
              className: props.classes.menu,
            },
            name: "currentProduct"
          }}
          helperText={props.selectedProductsError || "Example: Client1"}
        >
          {props.availableProducts.map((product, index) => (
            <MenuItem key={index} value={product}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
          helperText={"Example: €300"}
          margin="dense"
          required
          id="productPrice"
          label="Product Price"
          name="productPrice"
          type="number"
          className={props.classes.textFieldFirst}
          onChange={props.handleInputChange('productPrice')}
          value={props.productPrice} />
        <TextField
          helperText={"Example: €400"}
          margin="dense"
          required
          id="clientPrice"
          label="Client Price"
          name="clientPrice"
          type="number"
          className={props.classes.textFieldSecond}
          onChange={props.handleInputChange('clientPrice')}
          value={props.clientPrice} />
        {(props.currentProduct && props.clientPrice !== "" && props.clientPrice !== "")
          ? <Button color="primary" onClick={() => props.addSelectedChip("product")}>add product</Button>
          : null}
      </div>
  </section>
);

const AttachmentFormGroup = (props) => (
  <section className={props.classes.section}>
    <Typography type="subheading" gutterBottom color="secondary" className={props.classes.subHeader}>
      Add attachments to the job
    </Typography>
    <Divider/>
    <div className={props.classes.chipContainer}>
      {props.selectedUploads.map(image => {
        return (
          <Chip
            avatar={
              <Avatar>
                <ContentCopyIcon />
              </Avatar>
            }
            label={image.name}
            key={image.name}
            className={props.classes.chip}
            onRequestDelete={() => props.handleRequestDeleteChip(image, "upload")}
          />
        )
      })}
    </div>
    <input type="file" id="myFile" onChange={props.handleFileUpload} />
    {
      props.uploadLoading
        ? <CircularProgress/>
        : null
    }

    {props.isEditting
      ? <Button onClick={() => { if(props.confirmDelete()) {props.handleRemove(props.id)}}}>⚠️ Delete</Button>
      : null
    }
  </section>
);

const ActionGroup = (props) => (
  <section className={props.classes.actionSection}>
    <Button color="primary" onClick={props.handleRequestClose}>
      Cancel
    </Button>
    <Button color="primary" type="submit">{props.isEditting ? "Edit" : "Save"}</Button>
  </section>
);


export const CreateJob = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of job");
    return r === true;
  };

  return (
      <Paper className={classes.root}>
        <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
          <Typography type="title" gutterBottom>
            Create new job
          </Typography>
          <JobDetailFormGroup classes={classes} {...props}/>
          <CompanyFormGroup classes={classes} {...props}/>
          <ClientFormGroup classes={classes} {...props}/>
          <ProductFormGroup classes={classes} {...props}/>
          <AttachmentFormGroup classes={classes} {...props}/>
          <ActionGroup classes={classes} {...props} confirmDelete={confirmDelete}/>
        </form>
      </Paper>
  )
};

CreateJob.propTypes = {
  isEditing: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  uploadLoading: PropTypes.bool.isRequired,
  jobId: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  address1: PropTypes.string,
  address2: PropTypes.string,
  buildingName: PropTypes.string,
  notes: PropTypes.string,
  selectedClients: PropTypes.array.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  availableCompanies: PropTypes.array.isRequired,
  availableUsers: PropTypes.array.isRequired,
  productPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  clientPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentProduct: PropTypes.object,
  currentClient: PropTypes.object,
  selectedCompany: PropTypes.object,
};

export default withStyles(styles)(CreateJob);