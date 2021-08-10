import { useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
import { green, pink, blue } from '@material-ui/core/colors';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { useFetch } from 'use-http';
import { useParams } from 'react-router';
import EditCredentialDialog from './EditCredentialDialog';

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

export default function CredentialsItem({ credential, refresh, credId }) {
    const styles = useStyles()
    const [deleteOpenDialog, setDeleteOpenDialog] = useState(false);
    const [editOpenDialog, setEditOpenDialog] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const { del, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const credentialInfo = credential.credential
    let { id } = useParams();
    function handleClick() {
        setShowMore(!showMore)
    }
    const colors = [styles.orange, styles.purple, styles.pink, styles.green, styles.blue]
    const itemColor = () => {
        return (colors[Math.floor(Math.random() * colors.length)])
    }
    const buildCredential = () => {
        let result = []
        for (var property in credentialInfo) {
            result.push(
                <ListItem>
                    <ListItemText
                        primary={property}
                        secondary={credentialInfo[property]}
                    />
                </ListItem>
            )
        }
        return result
    }

    async function handleDelete() {
        await del(`/api/lean/projects/${id}/credentials/${credId}`)
        if (response.status === 200) {
            alert(`Deleted ${credential.name} successfully`)
            refresh()
        } else {
            alert('Error deleting credential')
        }
        handleDeleteClose()
    }

    function handleDeleteClose() {
        setDeleteOpenDialog(false)
    }

    const deleteDialog = () => {
        return (
            <Dialog
                open={deleteOpenDialog}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Do you want to delete ${credential.name}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting a credential will prevent you from using it again in any widget.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            <ListItem key={credential.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded" className={itemColor()}>
                        <VpnKeyIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={credential.name}
                    secondary={credential.source}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleClick}>
                        <ArrowForwardIosIcon className={[styles.dropdown, showMore ? styles.dropdownOpen : styles.dropdownClosed]} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {deleteDialog()}
            <EditCredentialDialog credential={credential} refresh={refresh} credId={credId} openDialog={editOpenDialog} setOpenDialog={setEditOpenDialog} />
            <Collapse in={showMore} timeout="auto" unmountOnExit>
                {buildCredential()}
                <Button onClick={() => setEditOpenDialog(true)}>
                    <CreateIcon />
                </Button>
                <Button onClick={() => setDeleteOpenDialog(true)}>
                    <DeleteIcon />
                </Button>
            </Collapse>
            <Divider />
        </div >
    );
}