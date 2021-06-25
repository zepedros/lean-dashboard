import { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Divider from '@material-ui/core/Divider'
import { TimePicker, DatePicker } from "@material-ui/pickers";
import {  useParams } from "react-router-dom";
import useFetch from 'use-http'


export default function AddWidgetDialog({ template, showDialog, setShowDialog,source }) {
    const [selectedCredential, setSelectedCredential] = useState("")
    const [isSpecificDate, setIsSpecificDate] = useState(false)
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [credentials,setCredentials] = useState([])
    const {  get, post, response, loading, error } = useFetch('http://localhost:3000/api', { credentials: "same-origin"})
    let { id } = useParams();
    console.log(source)
    useEffect(() => {loadCredentials()},[])


    async function loadCredentials(){
        const getCredentials= await get(`api/lean/projects/${id}/credentials`)
        if(response.ok) setCredentials(getCredentials)
        
    }

    const templateTest = {
        source: "Jira"
    }
    /*const credentials = [
        {
            name: "abc",
            source: "Jira",
            credential: {
                email: "leandashboardproject@gmail.com",
                token: "LPcyGdZolN906MvzdwPHF045",
                APIPath: "leandashboard.atlassian.net",
                APIVersion: 3
            }
        },
        {
            name: "cde",
            source: "Squash",
            credential: {
                email: "leandashboardproject@gmail.com",
                token: "LPcyGdZolN906MvzdwPHF045",
                APIPath: "leandashboard.atlassian.net",
                APIVersion: 3
            }
        },
        {
            name: "cdsdfsdfsde",
            source: "Jira",
            credential: {
                email: "leandashboardproject@gmail.com",
                token: "LPcyGdZolN906MvzdwPHF045",
                APIPath: "leandashboard.atlassian.net",
                APIVersion: 3
            }
        }
    ]*/



    function handleClose() {
        setShowDialog(false)
    }

    function handleSubmit() {
        handleClose()
    }
    //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Widget Configuration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Credentials
                    </DialogContentText>
                    <Select
                        native
                        value={selectedCredential}
                        onChange={event => setSelectedCredential(event.target.value)}
                        defaultValue=""
                        input={<Input id="grouped-native-select" />}
                    >
                        {credentials.map(credential => {
                                 if (credential.credentials.source == source) {
                                    return <option value={credential.credentials.name}>{credential.credentials.name}</option>
                                 }
                        })}
                    </Select>
                    <DialogContentText>
                        Select Widget Update Time
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            style={{width: 'auto'}}
                            ampm={false}
                            openTo="hours"
                            views={["hours", "minutes", "seconds"]}
                            format="HH:mm:ss"
                            label="Time"
                            value={time}
                            onChange={e => setTime(e)}
                        />
                        <DatePicker
                            variant="inline"
                            openTo="year"
                            views={["month"]}
                            label="Date"
                            value={date}
                            onChange={e => setDate(e)}
                        />
                    </MuiPickersUtilsProvider>
                    <Checkbox value="date" onChange={e => setIsSpecificDate(e.target.checked)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Widget
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}