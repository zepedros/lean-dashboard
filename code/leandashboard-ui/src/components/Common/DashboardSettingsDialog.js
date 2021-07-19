import { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useFetch from 'use-http'
import { useParams } from 'react-router';


export default function AddDialogDialog({ showDialog, setShowDialog,refreshDashboards,name,description }) {
    const { get,put,response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    let { id,dashboardId } = useParams();
    const [newName, setNewName] = useState(name)
    const [newDescription, setNewDescription] = useState(description)
    const [refresh, setRefreshDashboard] = useState(false)

      function handleClose() {
        //setInput({ name: "", description: "" })
        setNameError(false)
        setDescriptionError(false)
        setShowDialog(false)

    }
   

    async function handleSubmit() {
       
        if (!newName) {
            alert('Please insert a name!!')
            setNameError(true)
            return
        }
        if (!newDescription) {
            alert('Please insert a description!!')
            setDescriptionError(true)
            return
        }
        await put(`/api/lean/projects/${id}/dashboard/${dashboardId}`, { name: newName, description: newDescription })
        if (response.status === 200) {
            alert("Dashboard updated")
            refreshDashboards()
            
        } else {
            alert(response.data.message)
        }
        handleClose()
    }
    
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dashboard Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update your Dashboard
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProjectName"
                        label="Name"
                        error={nameError}
                        helperText="Please input a name."
                        type="name"
                        onChange={e => { setNewName(e.target.value ) }}
                        helperText={nameError}
                        fullWidth
                        value={newName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProjectDescription"
                        label="Description"
                        error={descriptionError}
                        helperText="Please input a description."
                        type="description"
                        onChange={e => { setNewDescription( e.target.value ) }}
                        helperText={descriptionError}
                        fullWidth
                        value={newDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}