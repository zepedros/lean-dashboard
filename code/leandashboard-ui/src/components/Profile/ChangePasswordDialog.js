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

export default function ChangePasswordDialog({showDialog, setShowDialog}){
    const [input, setInput] = useState({ oldPassword: "", newPassword: "",confirmNewPassword:"" })
    const [oldPasswordError, setOldPasswordError] = useState(false)
    const [newPassowrdError, setNewPassowordError] = useState(false)
    const [confirmNewPassowrdError, setconfirmNewPassowordError] = useState(false)


    function handleClose() {
        setShowDialog(false)
    }
    function handleSubmit() {
        if (!input.oldPassword) {
            alert('Please insert your Old Password')
            setOldPasswordError(true)
            return
        }
        if (!input.newPassword) {
            alert('Please insert your new password')
            setNewPassowordError(true)
            return
        }
        if (!input.confirmNewPassword) {
            alert('Please confirm your new password')
            setconfirmNewPassowordError(true)
            return
        }
        handleClose()
    }
    return(
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        label="Old Password"
                        error={oldPasswordError}
                        helperText="Please input your old password."
                        type="password"
                        onChange={e => { setInput({ oldPassword: e.target.value, newPassword: input.newPassword,confirmNewPassword:input.confirmNewPassword }) }}
                        helperText={oldPasswordError}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPassword"
                        label="New Password"
                        error={newPassowrdError}
                        helperText="Please input your new password."
                        type="password"
                        onChange={e => { setInput({ oldPassword: input.oldPassword, newPassword: e.target.value,confirmNewPassword:input.confirmNewPassword }) }}
                        helperText={newPassowrdError}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmNewPassword"
                        label="Confirm New Password"
                        error={confirmNewPassowrdError}
                        helperText="Confirm your new password."
                        type="password"
                        onChange={e => { setInput({  oldPassword: input.oldPassword, newPassword: input.newPassword,confirmNewPassword: e.target.value }) }}
                        helperText={confirmNewPassowrdError}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    
}