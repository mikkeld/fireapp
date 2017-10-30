import React  from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import AddIcon from 'material-ui-icons/Add';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';


const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
  },
  textFieldSelect: {
    marginLeft: 0,
    marginRight: 20,
    width: 200,
    marginTop: 25
  },
  menu: {
    width: 200,
  },
  contentStyle: {
    width: '90%',
    height: '90%'
  },
  createNewMenuItem: {
    color: "green"
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

const companies = [
  {
    name: "siac",
    value: "SIAC" ,
  },
  {
    name: "dunwoody",
    value: "Dunwoody & Dobson",
  }

];

const roles = [
  {
    name: "worker",
    value: "Worker",
  },
  {
    name: "client",
    value: "Client" ,
  }
];




export const CreateJobForm = (props) => {
  const { classes } = props;
  let confirmDelete = () => {
    const r = window.confirm("Confirm deletion of job");
    return r === true;
  };

  return (
    <div>
      <Dialog open={props.open}
              onRequestClose={props.handleRequestClose}
              fullScreen
              transition={<Slide direction="up" />}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={props.handleRequestClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Create Product
            </Typography>
            <Button color="contrast" onClick={props.handleRequestClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form onSubmit={props.isEditting ? props.handleEdit : props.handleSubmit}  noValidate autoComplete="off">
          <DialogTitle>{props.isEditting ? "Edit job " + props.username : "Create new job"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update job details
            </DialogContentText>
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
              className={classes.textField}
              onChange={props.handleInputChange('jobName')}
              value={props.jobName} />
            <TextField
              id="date"
              label="Job Start Day"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
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
              className={classes.textField}
              onChange={props.handleInputChange('buildingName')}
              value={props.buildingName} />
            <TextField
              helperText={"Example: Address 1"}
              margin="dense"
              id="address1"
              label="Address Line 1"
              name="address1"
              className={classes.textField}
              onChange={props.handleInputChange('address1')}
              value={props.address1} />
            <TextField
              helperText={"Example: Address 2"}
              margin="dense"
              id="address2"
              label="Address Line 2"
              name="address2"
              className={classes.textField}
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
            <TextField
              id="selectedCompany"
              select
              label="Select a company"
              margin="normal"
              className={classes.textFieldSelect}
              value={props.selectedCompany === null ? "" : props.selectedCompany}
              onChange={props.handleInputChange('selectedCompany')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
                name: "selectedCompany"
              }}
              helperText="Example: Company 1"
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
            className={classes.textField}
            disabled
            value={props.selectedCompany === null ? '' : props.selectedCompany.email} />
            <TextField
              margin="dense"
              label="Company Phone"
              id="companyPhone"
              name="companyPhone"
              className={classes.textField}
              disabled
              value={props.selectedCompany === null ? '' : props.selectedCompany.contactNumber} />
            <TextField
              margin="dense"
              label="Address Line 1"
              id="companyAddress1"
              name="companyAddress1"
              className={classes.textField}
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
            <Divider />
            <Typography>Add a company to the job</Typography>
            <TextField
              id="selectedUser"
              select
              label="Select a client"
              margin="normal"
              className={classes.textFieldSelect}
              value={(props.currentClient === undefined || props.currentClient === null) ? "" : props.currentClient}
              onChange={props.handleInputChange('currentClient')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
                name: "currentClient"
              }}
              helperText="Example: client 1"
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
              className={classes.textField}
              disabled
              value="" />
            <TextField
              margin="dense"
              label="Username"
              id="userUsername"
              name="userUsername"
              className={classes.textField}
              disabled
              value={props.currentClient === null ? '' : props.currentClient.username} />
            <TextField
              margin="dense"
              label="Email"
              id="userEmail"
              name="userEmail"
              className={classes.textField}
              disabled
              value={props.currentClient === null ? '' : props.currentClient.email} />
            <AddIcon onClick={() => props.addSelectedClient}/>

          </DialogContent>
          <DialogActions>
            {props.isEditting
              ? <Button onClick={() => { if(confirmDelete()) {props.handleRemove(props.id)}}}>⚠️ Delete</Button>
              : null
            }
            <Button color="primary" onClick={props.handleRequestClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">{props.isEditting ? "Edit" : "Save"}</Button>

          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
};

export default withStyles(styles)(CreateJobForm);