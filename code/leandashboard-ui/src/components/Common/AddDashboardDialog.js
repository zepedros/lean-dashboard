import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';

export default function AddDashboardDialog({ showDialog, setShowDialog, title, refreshDashboards }) {
    const [input, setInput] = useState({ name: "", description: "" })
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const { post } = useFetch(process.env.REACT_APP_API_FETCH_URI, { credentials: "same-origin" })
    let { id } = useParams();

    function handleClose() {
        setInput({ name: "", description: "" })
        setNameError(false)
        setDescriptionError(false)
        setShowDialog(false)
    }

    function handleSubmit() {
        if (!input.name) {
            alert('Please insert a name')
            setNameError(true)
            return
        }
        if (!input.description) {
            alert('Please insert a description')
            setDescriptionError(true)
            return
        }
        const body = {
            name: input.name,
            description: input.description
        }
        async function postDashboard(body) {
            return await post(`/api/lean/projects/${id}/dashboard`, body)
        }
        postDashboard(body).then(postresp => {
            console.log(postresp)
            if (postresp.statusCode === 201) {
                console.log('post done')
                alert("Dashboard created!")
                refreshDashboards()
            } else {
                alert("Error creating Dashboard")
                console.log('no post')
            }
        })
        handleClose()
    }
    //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormattedMessage id="Dashboards.dialogButton.subTitle" /> 
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProjectName"
                        label={<FormattedMessage id="Dashboards.dialogButton.name" /> }
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
                        label={<FormattedMessage id="Dashboards.dialogButton.description" /> }
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
                    <FormattedMessage id="Dashboards.dialogButton.cancel" />
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {title}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}