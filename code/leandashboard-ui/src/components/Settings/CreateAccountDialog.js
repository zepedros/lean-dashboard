import { useState } from 'react'
import { useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useFetch from 'use-http'
import {FormattedMessage} from 'react-intl';

export default function CreateAccountDialog({showDialog, setShowDialog}){
    const [input, setInput] = useState({ username: "", password: "" })
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    function handleClose() {
        setShowDialog(false)
    }
    function handleSubmit() {
        if (!input.username) {
            alert('Please insert a username')
            setUsernameError(true)
            return
        }
        if (!input.password) {
            alert('Please insert a password')
            setPasswordError(true)
            return
        }
        handleClose()
    }
    return(
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="Settings.createAccount"/></DialogTitle>
                <DialogContent>
                <DialogContentText>
                 <FormattedMessage id="Settings.title"/>
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label={<FormattedMessage id="Settings.username"/>}
                        error={usernameError}
                        helperText="Please input a username."
                        //type="password"
                        onChange={e => { setInput({ username: e.target.value, password: input.password}) }}
                        helperText={usernameError}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label={<FormattedMessage id="Settings.password"/>}
                        error={passwordError}
                        helperText="Please input a password."
                        type="password"
                        onChange={e => { setInput({ username: input.username, password: e.target.value }) }}
                        helperText={passwordError}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <FormattedMessage id="Settings.cancel"/>
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        <FormattedMessage id="Settings.createAccount"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    
}