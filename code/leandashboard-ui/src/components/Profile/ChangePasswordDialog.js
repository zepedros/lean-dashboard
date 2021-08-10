import { useContext, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useFetch from 'use-http'
import {FormattedMessage} from 'react-intl';
import UserContext from '../../common/UserContext';


export default function ChangePasswordDialog({showDialog, setShowDialog}){
    const [input, setInput] = useState({  newPassword: "",confirmNewPassword:"" })
    const [newPassowrdError, setNewPassowordError] = useState(false)
    const [confirmNewPassowrdError, setconfirmNewPassowordError] = useState(false)
    const { put } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)


    function handleClose() {
        setShowDialog(false)
    }
    const handleClickShowPassword = () => {
        setInput({ ...input, showPassword: !input.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      }; 
    async function handleSubmit() {
        
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
        if(input.newPassword===input.confirmNewPassword){
            
            const body={
                newPassword: input.confirmNewPassword
            }
            await put(`lean/users/${context.credentials.username}/password`,body)
            alert('Password Changed')
        }
        else{
            alert('Different passwords!')
            return
        }
        handleClose()
    }
    return(
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="Profile.changePassowrd.button"/></DialogTitle>
                <DialogContent>
                   
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPassword"
                        label={<FormattedMessage id="Profile.changePassowrd.secondInput"/>}
                        error={newPassowrdError}
                        helperText="Please input your new password."
                        type="password"
                        onChange={e => { setInput({  newPassword: e.target.value,confirmNewPassword:input.confirmNewPassword }) }}
                        helperText={newPassowrdError}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmNewPassword"
                        label={<FormattedMessage id="Profile.changePassowrd.thirdInput"/>}
                        error={confirmNewPassowrdError}
                        helperText="Confirm your new password."
                        type="password"
                        onChange={e => { setInput({  newPassword: input.newPassword,confirmNewPassword: e.target.value }) }}
                        helperText={confirmNewPassowrdError}
                        fullWidth
                    />
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <FormattedMessage id="Profile.changePassowrd.cancel"/>
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        <FormattedMessage id="Profile.changePassowrd.confirm"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    
}