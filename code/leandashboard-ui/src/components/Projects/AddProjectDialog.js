import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function AddProjectDialog({showDialog, setShowDialog}) {
    const [input, setInput] = useState({ name: "", description: "" })
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    function handleClose() {
        setNameError(false)
        setDescriptionError(false)
        setShowDialog(false)
    }

    function handleSubmit() {
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
        alert(`the project name: ${input.name} description: ${input.description} was created!`)
        setInput({ name: "", description: "" })
        //TODO criar projeto e dar refresh
        handleClose()
    }
    //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new Project
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProjectName"
                        label="Project Name"
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
                        label="Project Description"
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
                        Add Project
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}