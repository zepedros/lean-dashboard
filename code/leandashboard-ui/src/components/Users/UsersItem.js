import { useState } from 'react'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { green, pink, purple, orange, blue } from '@material-ui/core/colors';
import FaceIcon from '@material-ui/icons/Face';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    dropdown: {
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        })
    },
    dropdownOpen: {
        transform: "rotate(90deg)"
    },
    dropdownClosed: {
        transform: "rotate(0)"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },

}))

export default function UsersItem({ user, deleteUser, removeRoleFromUser, addRoleToUser, changeUsername, changePassword }) {
    const styles = useStyles()
    const [showMore, setShowMore] = useState(false)
    const [userToDelete, setUserToDelete] = useState()
    const [userToAlterRoles, setUserToAlterRoles] = useState()
    const [userToEdit, setUserToEdit] = useState()
    const [selectedUserRoles, setSelectedUserRoles] = useState([])
    const [roleToRemove, setRoleToRemove] = useState()
    const [roleToGive, setRoleToGive] = useState('');
    const [deleteUserOpenDialog, setDeleteUserOpenDialog] = useState(false);
    const [rolesOpenDialog, setRolesOpenDialog] = useState(false)
    const [removeRoleOpenDialog, setRemoveRoleOpenDialog] = useState(false)
    const [userEditingOpenDialog, setUserEditingOpenDialog] = useState(false)
    const [input, setInput] = useState({ username: "", password: "", showPassword: false, })

    function handleClick() {
        setShowMore(!showMore)
    }

    const handleChange = (event) => {
        setRoleToGive(event.target.value);
    };

    const handleClickShowPassword = () => {
        setInput({ ...input, showPassword: !input.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const colors = [styles.orange, styles.purple, styles.pink, styles.green, styles.blue]
    const itemColor = () => {
        return (colors[Math.floor(Math.random() * colors.length)])
    }


    const handleDeleteUserOpen = (username) => {
        setUserToDelete(username)
        setDeleteUserOpenDialog(true);
    };

    const handleDeleteUserClose = () => {
        setUserToDelete(undefined)
        setDeleteUserOpenDialog(false);
    };

    const handleRolesOpen = () => {
        setUserToAlterRoles(user.username)
        setSelectedUserRoles(user.roles)
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
                fullWidth="sm"
                maxWidth="sm"
                onClose={handleRolesClose}
                aria-labelledby="user-roles-alert-dialog"
                aria-describedby="dialog used to show and manage roles"
            >
                <DialogTitle id="alert-dialog-title">{`${userToAlterRoles} Roles`}</DialogTitle>
                <DialogContent>
                    {selectedUserRoles.map(role => <Chip color="primary"
                        label={role.role}
                        icon={<ClearIcon></ClearIcon>}
                        onClick={() => {
                            setRoleToRemove(role.role)
                            handleRemoveRoleOpen(role.role)
                        }}>
                    </Chip>)}
                    <DialogContent>
                        <Divider variant='fullWidth'></Divider>
                    </DialogContent>
                    <DialogContent>
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

    const rolesSelectForm = () => {
        return (
            <FormControl variant="outlined" className={styles.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Roles</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={roleToGive}
                    onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'manager'}>Manager</MenuItem>
                    <MenuItem value={'Colaborator'}>Collaborator</MenuItem>
                </Select>
            </FormControl>
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
                    console.log('inside change username');
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

    return (
        <div>
            <ListItem key={user.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded" className={itemColor()}>
                        <AccountTreeIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.username}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleClick}>
                        <ArrowForwardIosIcon className={[styles.dropdown, showMore ? styles.dropdownOpen : styles.dropdownClosed]} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={showMore} timeout="auto" unmountOnExit>
                <MenuItem onClick={() => { handleDeleteUserOpen(user.username) }}>
                    <ListItem divider={true} >
                        Delete user {<div align="right"><DeleteIcon align="right"></DeleteIcon></div>}
                    </ListItem>
                </MenuItem>
                <MenuItem onClick={() => handleRolesOpen(user.username)}>
                    <ListItem >
                        User roles {<FaceIcon></FaceIcon>}
                    </ListItem>
                </MenuItem>
                <MenuItem onClick={() => handleEditingOpen(user.username)}>
                    <ListItem >
                        Edit user {<EditIcon></EditIcon>}
                    </ListItem>
                </MenuItem>
            </Collapse>
            <Divider />
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