import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useFetch from 'use-http';
import PasswordStrengthBar from 'react-password-strength-bar';
import messages from '../../i18n/messages';

export default function CreateAccountDialog({ showDialog, setShowDialog }) {
    const [input, setInput] = useState({ username: "", password: "", showPassword: false, })
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const { post } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })

    function handleClose() {
        setShowDialog(false)
    }
    const handleClickShowPassword = () => {
        setInput({ ...input, showPassword: !input.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

        const body = {
            username: input.username,
            password: input.password
        }
        postCreateAccount(body).then(postresp => {
            console.log(postresp)
            if (postresp.statusCode === 201) {
                console.log('post done')
                alert("Account created!")
            } else {
                alert("Error creating Account")
                console.log('no post')
            }
        })
        handleClose()
    }
    async function postCreateAccount(body) {
        return await post('lean/register', body)
    }
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="Settings.createAccount" /></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormattedMessage id="Settings.title" />
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label={<FormattedMessage id="Settings.username" />}
                        error={usernameError}
                        helperText="Please input a username."
                        //type="password"
                        onChange={e => { setInput({ username: e.target.value, password: input.password }) }}
                        helperText={usernameError}
                        fullWidth
                    />

                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={input.showPassword ? 'text' : 'password'}
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
                    <PasswordStrengthBar password={input.password} minLength={7} scoreWords={(messages[localStorage.getItem("key")].Settings.passwordStrength)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <FormattedMessage id="Settings.cancel" />
                    </Button>
                    <Button onClick={handleSubmit} color="primary" >
                        <FormattedMessage id="Settings.createAccount" />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}