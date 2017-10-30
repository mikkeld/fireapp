import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 200,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});



export const CreateJob = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of job");
    return r === true;
  };

  const CompanyFormGroup = () => (
    <div>
      <TextField
        id="selectedCompany"
        select
        error={props.selectedCompanyError !== ''}
        label="Select a company"
        margin="normal"
        className={styles.textFieldSelect}
        value={props.selectedCompany === null ? "" : props.selectedCompany}
        onChange={props.handleInputChange('selectedCompany')}
        SelectProps={{
          MenuProps: {
            className: styles.menu,
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
      </TextField>
      <TextField
        margin="dense"
        label="Company email"
        id="companyEmail"
        name="companyEmail"
        className={styles.textField}
        disabled
        value={props.selectedCompany === null ? '' : props.selectedCompany.email} />
      <TextField
        margin="dense"
        label="Company Phone"
        id="companyPhone"
        name="companyPhone"
        className={styles.textField}
        disabled
        value={props.selectedCompany === null ? '' : props.selectedCompany.contactNumber} />
      <TextField
        margin="dense"
        label="Address Line 1"
        id="companyAddress1"
        name="companyAddress1"
        className={styles.textField}
        disabled
        value={props.selectedCompany === null ? '' : props.selectedCompany.address1} />
      <TextField
        id="companyNotes"
        label="Company notes"
        multiline
        rows="4"
        value={props.selectedCompany === null ? '' : props.selectedCompany.notes}
        disabled
      />
    </div>
  );
  // Add client automaticcaly if length of selectedClients is 0. */

  // Only show if the item is not already selected */

  const ClientFormGroup = () => (
    <div>
      <TextField
        id="selectedUser"
        select
        error={props.selectedClientsError !== ''}
        label="Select a client"
        margin="normal"
        className={styles.textFieldSelect}
        value={(props.currentClient === undefined || props.currentClient === null) ? "" : props.currentClient}
        onChange={props.handleInputChange('currentClient')}
        SelectProps={{
          MenuProps: {
            className: styles.menu,
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
       <TextField
          margin="dense"
          label="Company Name"
          id="userCompanyName"
          name="userCompanyName"
          className={styles.textField}
          disabled
          value="" />
        <TextField
          margin="dense"
          label="Username"
          id="userUsername"
          name="userUsername"
          className={styles.textField}
          disabled
          value={props.currentClient === null ? '' : props.currentClient.username} />
        <TextField
          margin="dense"
          label="Email"
          id="userEmail"
          name="userEmail"
          className={styles.textField}
          disabled
          value={props.currentClient === null ? '' : props.currentClient.email} />
     </div>
  );

  const ProductFormGroup = () => (
    <div>
      <TextField
        id="selectedProduct"
        select
        label="Select a product"
        margin="normal"
        className={styles.textFieldSelect}
        value={(props.currentProduct === undefined || props.currentProduct === null) ? "" : props.currentProduct}
        onChange={props.handleInputChange('currentProduct')}
        SelectProps={{
          MenuProps: {
            className: styles.menu,
          },
          name: "currentProduct"
        }}
        helperText="Example: product 1"
      >
        {props.availableProducts.map((product, index) => (
          <MenuItem key={index} value={product}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        helperText={"Example: €300"}
        margin="dense"
        id="productPrice"
        label="Product Price"
        name="productPrice"
        className={styles.textField}
        onChange={props.handleInputChange('productPrice')}
        value={props.productPrice} />
      <TextField
        helperText={"Example: €400"}
        margin="dense"
        id="clientPrice"
        label="Client Price"
        name="clientPrice"
        className={styles.textField}
        onChange={props.handleInputChange('clientPrice')}
        value={props.clientPrice} />
    </div>
  );


  return (
      <div>
        {"inital id " + props.jobId}
        <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
          <h2>Update job details</h2>
          <TextField
            error={props.jobIdError !== ''}
            helperText={props.jobIdError || "Example: ES10"}
            autoFocus
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
            margin="dense"
            id="jobName"
            label="Job Name"
            name="jobName"
            className={styles.textField}
            onChange={props.handleInputChange('jobName')}
            value={props.jobName} />
          <TextField
            id="date"
            label="Job Start Day"
            type="date"
            defaultValue="2017-05-24"
            className={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            error={props.buildingNameError !== ''}
            helperText={props.buildingNameError || "Example: Spencer Dock"}
            margin="dense"
            id="buildingName"
            label="Building Name"
            name="buildingName"
            className={styles.textField}
            onChange={props.handleInputChange('buildingName')}
            value={props.buildingName} />
          <TextField
            helperText="Example: Address 1"
            margin="dense"
            id="address1"
            label="Address Line 1"
            name="address1"
            className={styles.textField}
            onChange={props.handleInputChange('address1')}
            value={props.address1} />
          <TextField
            helperText={"Example: Address 2"}
            margin="dense"
            id="address2"
            label="Address Line 2"
            name="address2"
            className={styles.textField}
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
          <Divider />
          <Typography>Add a company to the job</Typography>
          <CompanyFormGroup/>
          <Divider />
          <Typography>Add a client to the job</Typography>
          {props.selectedClients.map(client => {
            return (
              <Chip
                label={client.username}
                key={client.id}
                onRequestDelete={() => props.handleRequestDeleteChip(client, "client")}
              />
            )
          })}
          <ClientFormGroup/>
          <AddIcon onClick={() => props.addSelectedChip("client")}/>

          <Divider/>
          <Typography>Add a product to the job</Typography>
          {props.selectedProducts.map((product, index) => {
            return (
              <Chip
                label={product.name}
                key={index}
                onRequestDelete={() => props.handleRequestDeleteChip(product, "product")}
              />
            )
          })}
          <ProductFormGroup/>
          <AddIcon onClick={() => props.addSelectedChip("product")}/>

          <Divider/>
          <Typography>Add attachments to the job</Typography>
          {props.selectedUploads.map(image => {
            // When this is clicked, should open dialog with image in large. This dialog should have a download option
            return (
              <Chip
                avatar={
                  <Avatar>
                    <ContentCopyIcon />
                  </Avatar>
                }
                label={image.name}
                key={image.name}
                onRequestDelete={() => props.handleRequestDeleteChip(image, "upload")}
              />
            )
          })}
          <input type="file" id="myFile" onChange={props.handleFileUpload} />
          {
            props.uploadLoading
            ? <CircularProgress/>
            : null
          }

          {props.isEditting
            ? <Button onClick={() => { if(confirmDelete()) {props.handleRemove(props.id)}}}>⚠️ Delete</Button>
            : null
          }
          <Button color="primary" onClick={props.handleRequestClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">{props.isEditting ? "Edit" : "Save"}</Button>
        </form>
      </div>
  )
};

export default withStyles(styles)(CreateJob);