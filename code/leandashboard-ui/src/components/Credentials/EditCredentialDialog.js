import { useState } from "react"
import { useFetch } from "use-http"
import { Dialog } from "@material-ui/core"
import { useParams } from "react-router"
import { TextField } from "@material-ui/core"
import { FormattedMessage } from "react-intl"
import { Select } from "@material-ui/core"
import { DialogTitle } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { DialogActions } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { Input } from "@material-ui/core"

export default function EditCredentialDialog({ credential, refresh, credId, openDialog, setOpenDialog }) {
    const [inputName, setInputName] = useState(credential.name)
    const { put, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const credentialInfo = credential.credential
    const [inputCredential, setInputCredential] = useState(credentialInfo)
    let { id } = useParams();
    const buildEditCredential = () => {
        if (credential.source == 'Jira') {
            return (
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label="Email"
                        helperText="Please insert an email"
                        value={inputCredential.email}
                        onChange={e => {
                            const aux = {
                                email: e.target.value,
                                token: inputCredential.token,
                                APIPath: inputCredential.APIPath,
                                APIVersion: inputCredential.APIVersion
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label="Token"
                        helperText="Please insert a token"
                        value={inputCredential.token}
                        onChange={e => {
                            const aux = {
                                email: inputCredential.email,
                                token: e.target.value,
                                APIPath: inputCredential.APIPath,
                                APIVersion: inputCredential.APIVersion
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label={<FormattedMessage id="Credentials.path" />}
                        value={inputCredential.APIPath}
                        helperText="Please insert a path"
                        type="name"
                        onChange={e => {
                            const aux = {
                                email: inputCredential.email,
                                token: inputCredential.token,
                                APIPath: e.target.value,
                                APIVersion: inputCredential.APIVersion
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <Select
                        native
                        value={inputCredential.APIVersion}
                        onChange={e => {
                            const aux = {
                                email: inputCredential.email,
                                token: inputCredential.token,
                                APIPath: inputCredential.APIPath,
                                APIVersion: e.target.value
                            }
                            setInputCredential(aux)
                        }}
                        input={<Input id="grouped-native-select" />}
                    >
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                    </Select>
                </div>
            )
        } else if (credential.source == 'Squash') {
            return (
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label={<FormattedMessage id="Credentials.username" />}
                        helperText="Please insert a username"
                        value={inputCredential.username}
                        onChange={e => {
                            const aux = {
                                username: e.target.value,
                                password: inputCredential.password,
                                APIPath: inputCredential.APIPath
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label={<FormattedMessage id="Credentials.password" />}
                        helperText="Please insert a password"
                        value={inputCredential.password}
                        onChange={e => {
                            const aux = {
                                username: inputCredential.username,
                                password: e.target.value,
                                APIPath: inputCredential.APIPath
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label={<FormattedMessage id="Credentials.path" />}
                        value={inputCredential.APIPath}
                        helperText="Please insert a path"
                        type="name"
                        onChange={e => {
                            const aux = {
                                username: inputCredential.username,
                                password: inputCredential.password,
                                APIPath: e.target.value
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label="Email"
                        helperText="Please insert an email"
                        value={inputCredential.email}
                        onChange={e => {
                            const aux = {
                                email: e.target.value,
                                token: inputCredential.token,
                                Instance: inputCredential.Instance
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label="Token"
                        helperText="Please insert a token"
                        value={inputCredential.token}
                        onChange={e => {
                            const aux = {
                                email: inputCredential.email,
                                token: e.target.value,
                                Instance: inputCredential.Instance
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-margin-dense"
                        label="Instance"
                        value={inputCredential.Instance}
                        helperText="Please insert an Instance"
                        type="name"
                        onChange={e => {
                            const aux = {
                                email: inputCredential.email,
                                token: inputCredential.token,
                                Instance: e.target.value
                            }
                            setInputCredential(aux)
                        }}
                        fullWidth
                    />
                </div>
            )
        }
    }

    function handleEditClose() {
        setOpenDialog(false)
    }

    async function handleEdit() {
        await put(`/api/lean/projects/${id}/credentials/${credId}`, { name: inputName, source: credential.source, credential: inputCredential })
        if (response.status === 200) {
            alert(`Updated credential successfully`)
            refresh()
        } else {
            alert('Error updating credential')
        }
        handleEditClose()
    }

    return (
        <Dialog open={openDialog} onClose={handleEditClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit {credential.name}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-margin-dense"
                    label={<FormattedMessage id="Credentials.name" />}
                    helperText="Please insert an Name"
                    value={inputName}
                    onChange={e => {
                        setInputName(e.target.value)
                    }}
                    fullWidth
                />
                {buildEditCredential()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose} color="primary">
                    <FormattedMessage id="Projects.dialogButton.cancel" />
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}