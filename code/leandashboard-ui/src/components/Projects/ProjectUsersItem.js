import { useState } from 'react'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { green, pink, blue } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

export default function ProjectUsersItem({ user, deleteUser }) {
    const styles = useStyles()
    const [showMore, setShowMore] = useState(false)
    const [userToDelete, setUserToDelete] = useState()
    const [deleteUserOpenDialog, setDeleteUserOpenDialog] = useState(false);

    function handleClick() {
        setShowMore(!showMore)
    }

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

    const deleteUserDialog = () => {
        return (
            <Dialog
                open={deleteUserOpenDialog}
                onClose={handleDeleteUserClose}
                aria-labelledby="delete-user-alert-dialog"
                aria-describedby="alert dialog to handle user deletion"
            >
                <DialogTitle id="alert-dialog-title">{`Do you want to delete ${userToDelete} from this project?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting a user from a project will make it so they can't access this project anymore.
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
                    <MenuItem onClick={() => { handleDeleteUserOpen(user.username) }}>
                        <div align="right"><DeleteIcon align="right"></DeleteIcon></div>
                    </MenuItem>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {
                deleteUserDialog()
            }
        </div>
    );
}