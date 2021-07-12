import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useFetch from 'use-http'
import { useParams } from 'react-router';


export default function AddProjectDialog({ showDialog, setShowDialog,refreshDashboards }) {
    const [input, setInput] = useState({ name: "", description: "" })
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const { put,response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id,dashboardId } = useParams();

    function handleClose() {
        setInput({ name: "", description: "" })
        setNameError(false)
        setDescriptionError(false)
        setShowDialog(false)

    }


    async function handleSubmit() {
        if (!input.name) {
            alert('Please insert a name!!')
            setNameError(true)
            return
        }
        if (!input.description) {
            alert('Please insert a description!!')
            setDescriptionError(true)
            return
        }
        await put(`/api/lean/projects/${id}/dashboard/${dashboardId}`, { name: input.name, description: input.description })
        if (response.status === 200) {
            alert("Dashboard updated")
            //update
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
                        onChange={e => { setInput({ name: e.target.value, description: input.description }) }}
                        helperText={nameError}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProjectDescription"
                        label="Description"
                        error={descriptionError}
                        helperText="Please input a description."
                        type="description"
                        onChange={e => { setInput({ name: input.name, description: e.target.value }) }}
                        helperText={descriptionError}
                        fullWidth
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