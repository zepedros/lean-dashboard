import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import PasswordStrengthBar from 'react-password-strength-bar';
import messages from '../../i18n/messages';
import { I18nProvider, LOCALES } from '../../i18n';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(username, id) {
  return { username, id };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
    position: "relative",
    right: -350,
    bottom: 0,
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  root: {
    backgroundColor: 'orange'
  },
  formControl: {
    minWidth: 100,
  },
}));

export default function CustomizedTables({ users, refresh, deleteUser, removeRoleFromUser, addRoleToUser, changeUsername, changePassword }) {
  const classes = useStyles();
  const [userToDelete, setUserToDelete] = useState()
  const [userToAlterRoles, setUserToAlterRoles] = useState()
  const [userToEdit, setUserToEdit] = useState()
  const [selectedUserRoles, setSelectedUserRoles] = useState([])
  const [roleToRemove, setRoleToRemove] = useState()
  const [roleToGive, setRoleToGive] = React.useState('');
  const rows = users ? users.map(user => { return createData(user.username, user.id) }) : undefined
  const [deleteUserOpenDialog, setDeleteUserOpenDialog] = useState(false);
  const [rolesOpenDialog, setRolesOpenDialog] = useState(false)
  const [removeRoleOpenDialog, setRemoveRoleOpenDialog] = useState(false)
  const [userEditingOpenDialog, setUserEditingOpenDialog] = useState(false)
  const [input, setInput] = useState({ username: "", password: "", showPassword: false, })

  useEffect(() => {
    console.log('User roles are \n' + selectedUserRoles);
  }, [selectedUserRoles])

  const handleChange = (event) => {
    setRoleToGive(event.target.value);
  };

  const handleDeleteUserOpen = (username) => {
    setUserToDelete(username)
    setDeleteUserOpenDialog(true);
  };

  const handleDeleteUserClose = () => {
    setUserToDelete(undefined)
    setDeleteUserOpenDialog(false);
  };

  const handleClickShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRolesOpen = (username) => {
    let indexOfUser = users.findIndex(user => user.username === username)
    let selectedUser = users[indexOfUser]
    let roles = selectedUser.roles
    setUserToAlterRoles(username)
    setSelectedUserRoles(roles)
    setRolesOpenDialog(true);
  };

  const handleRolesClose = () => {
    setSelectedUserRoles([])
    //setUserToAlterRoles(undefined)
    setRolesOpenDialog(false);
  };

  const handleRemoveRoleOpen = (role) => {
    setRoleToRemove(role)
    setRemoveRoleOpenDialog(true)
  };

  const handleRemoveRoleClose = () => {
    setUserToAlterRoles(undefined)
    setRemoveRoleOpenDialog(false);
  };

  const handleEditingOpen = (username) => {
    setUserToEdit(username)
    setUserEditingOpenDialog(true)
  };

  const handleEditingClose = () => {
    setUserToEdit(undefined)
    setUserEditingOpenDialog(false)
  }


  const deleteUserDialog = () => {
    return (
      <Dialog
        open={deleteUserOpenDialog}
        onClose={handleDeleteUserClose}
        aria-labelledby="delete-user-alert-dialog"
        aria-describedby="alert dialog to handle user deletion"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to delete ${userToDelete}'s account?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a user account is not reversible and will remove that user from all it's projects
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUserClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteUser(userToDelete)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const userRolesDialog = () => {
    return (
      <Dialog
        open={rolesOpenDialog}
        fullWidth={true}
        maxWidth="sm"
        onClose={handleRolesClose}
        aria-labelledby="user-roles-alert-dialog"
        aria-describedby="dialog used to show and manage roles"
      >
        <DialogTitle id="alert-dialog-title" align="center">{`${userToAlterRoles} Roles`}</DialogTitle>
        <DialogContent align="center">
          {selectedUserRoles.map(role => <Chip color="primary"
            label={role.role}
            icon={<ClearIcon></ClearIcon>}
            key={role.role}
            onClick={() => {
              setRoleToRemove(role.role)
              handleRemoveRoleOpen(role.role)
            }}>
          </Chip>)}
          <DialogContent>
            <Divider variant='fullWidth'></Divider>
          </DialogContent>
          <DialogContent align="center">
            Give user the role: {rolesSelectForm()} <Button onClick={() => addRoleToUser(userToAlterRoles, roleToGive)} align="right" variant="contained" color="primary">Add</Button>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRolesClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const removeRoleFromUserDialog = () => {
    return (
      <Dialog
        open={removeRoleOpenDialog}
        onClose={handleRemoveRoleClose}
        aria-labelledby="remove-role-alert-dialog"
        aria-describedby="dialog to confirm role removal from a user"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to remove the role ${roleToRemove} from the user ${userToAlterRoles}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If removing the role manager from a user, all it's projects ownership will be given to the Superuser
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveRoleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => removeRoleFromUser(userToAlterRoles, roleToRemove)} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const editUserDialog = () => {
    return (
      <Dialog
        open={userEditingOpenDialog}
        onClose={handleEditingClose}
        aria-labelledby="user-editing-alert-dialog"
        aria-describedby="dialog to edit details about a user"
      >
        <DialogTitle id="alert-dialog-title">{`Edit user ${userToEdit}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Change the current user's password or username
          </DialogContentText>
          <div>
            <InputLabel htmlFor="new-username">New Username</InputLabel>
            <Input
              id="new-username"
              label={<FormattedMessage id="New Username" />}
              value={input.username}
              //onChange={handleChange('password')}
              onChange={e => { setInput({ username: e.target.value, password: input.password }) }}

            />
            <Button color="primary" align="right" onClick={() => {
              if (input.username === '') {
                alert('Please enter a username')
              } else {
                changeUsername(userToEdit, input.username)
              }
              //setUserEditingOpenDialog(false)
            }}>Change Username</Button>
          </div>
          <div>
            <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={input.showPassword ? 'text' : 'password'}
              label={<FormattedMessage id="New Password" />}
              value={input.password}
              //onChange={handleChange('password')}
              onChange={e => { setInput({ username: input.username, password: e.target.value }) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {input.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <PasswordStrengthBar password={input.password} minLength={7} scoreWords={(messages[localStorage.getItem("key")].Settings.passwordStrength)} />
            <Button color="primary" onClick={() => {
              if (input.password === '') {
                alert('Please enter a password')
              } else {
                changePassword(userToEdit, input.password)
              }
            }}>Change Password</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditingClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const rolesSelectForm = () => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Roles</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={roleToGive}
          onChange={handleChange}
          label="Roles"
          
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>
          <MenuItem value={'manager'} >Manager</MenuItem>
          <MenuItem value={'Colaborator'} >Collaborator</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <div>
      <Container maxWidth="md">
        <Typography component="h1" variant="h5">
          Lean Dashboard Users
        </Typography>
        <Paper >
          <TableContainer component={Paper} elevation={3} style={{ maxHeight: 480 }}>
            <Table className={classes.table} aria-label="customized table" >
              <TableHead className={classes.root}>
                <TableRow>
                  <StyledTableCell align="center">User</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell
                      align="center">{row.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Add Roles" aria-label="add" placement="left">
                        <Button align="right" onClick={() => handleRolesOpen(row.username)}>
                          <FaceIcon color="primary"></FaceIcon>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete Account" aria-label="add" placement="left">
                        <Button align="right" onClick={() => handleDeleteUserOpen(row.username)}>
                          <DeleteIcon color="primary"></DeleteIcon>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit User" aria-label="add" placement="left">
                        <Button align="right" onClick={() => handleEditingOpen(row.username)}>
                          <EditIcon color="primary"></EditIcon>
                        </Button>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      {
        deleteUserDialog()
      }
      {
        userRolesDialog()
      }
      {
        removeRoleFromUserDialog()
      }
      {
        editUserDialog()
      }
    </div>
  );
}