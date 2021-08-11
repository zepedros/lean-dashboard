import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from "react-router-dom";
import useFetch from 'use-http';
import MonthWeekDayPicker from './MonthWeekDayPicker';

export default function AddWidgetDialog({ showDialog, setShowDialog, source, templateId, templateParams }) {
    const [selectedCredential, setSelectedCredential] = useState("")
    const [isSpecificDate, setIsSpecificDate] = useState(false)
    const [time, setTime] = useState(new Date())
    const [params, setParams] = useState([])
    const [date, setDate] = useState(new Date())
    const [credentialsProject, setCredentials] = useState([])
    const { get, post, response } = useFetch('http://localhost:3000/api', { credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    useEffect(() => { loadCredentials() }, [])

    let history = useHistory();

    async function loadCredentials() {
        const getCredentials = await get(`api/lean/projects/${id}/credentials`)
        if (response.ok) setCredentials(getCredentials)
    }
    const [month, setMonth] = useState("*")
    const [weekday, setWeekDay] = useState("*")

    function handleClose() {
        setShowDialog(false)
        setIsSpecificDate(false)
        setTime(new Date())
        setDate(new Date())
        setMonth("*")
        setWeekDay("*")
    }

    const makeParams = () => {
        let result = []
        console.log('ENTERED MAKE PARAMS')
        for (let i = 0; i < templateParams.length; i++) {
            result.push(<TextField
                margin="dense"
                id={templateParams[i]}
                label={templateParams[i]}
                type="name"
                onChange={e => { 
                    let aux = params
                    aux[i] = e.target.value
                    setParams(aux)
                }}
                fullWidth
            />)
        }
        return result
    }

    function handleSubmit() {
        console.log(params)
        let timeSettings
        if (isSpecificDate) {
            if (!time) {
                alert('Please insert time')
                return
            }
            if (!date) {
                timeSettings = {
                    seconds: `${time.getSeconds()}`,
                    minutes: `${time.getMinutes()}`,
                    hours: `${time.getHours()}`,
                    dayOfMonth: "*",
                    dayOfWeek: "*",
                    month: "*"
                }
            } else {
                timeSettings = {
                    seconds: `${time.getSeconds()}`,
                    minutes: `${time.getMinutes()}`,
                    hours: `${time.getHours()}`,
                    dayOfMonth: `${date.getDate()}`,
                    dayOfWeek: `${date.getDay()}`,
                    month: `${date.getMonth()}`
                }
            }
        } else {
            timeSettings = {
                seconds: `${time.getSeconds()}`,
                minutes: time.getMinutes() == 0 ? '*' : `*/${time.getMinutes()}`,
                hours: time.getHours() == 0 ? '*' : `*/${time.getHours()}`,
                dayOfMonth: `*`,
                dayOfWeek: `${weekday}`,
                month: `${month}`
            }
        }
        if (selectedCredential === "") {
            alert('Please select a credential')
            return
        }
        const body = {
            timeSettings: timeSettings,
            credentials: selectedCredential,
            params: params
        }
        async function postWidget(body) {
            return await post(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${templateId}`, body)
        }
        postWidget(body).then(postresp => {
            console.log(postresp)
            if (postresp.statusCode === 201) {
                console.log('post done')
                alert("Widget created!")
                history.push(`/projects/${id}/dashboards/${dashboardId}/`);
            } else {
                alert("Error creating Widget")
                console.log('no post')
            }
        })
        handleClose()
    }
    //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="Widget.config" /></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormattedMessage id="Widget.subTitle" />
                    </DialogContentText>
                    <form>
                        <Select
                            native
                            onChange={event => setSelectedCredential(event.target.value)}
                            defaultValue={""}
                            input={<Input id="grouped-native-select" />}
                        >
                            <option value="">None</option>
                            {credentialsProject.map(cp => {
                                if (cp.credentials.source == source) {
                                    return <option value={cp.credentials.name}>{cp.credentials.name}</option>
                                }
                            })}
                        </Select>
                        {makeParams()}
                        <DialogContentText>
                        </DialogContentText>
                        <DialogContentText>
                            <FormattedMessage id="Widget.subTitle1" />
                        </DialogContentText>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DialogContentText>
                            </DialogContentText>
                            {isSpecificDate ?
                                <div>
                                    <TimePicker
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        format="HH:mm:ss"
                                        label="Time"
                                        value={time}
                                        onChange={e => setTime(e)}
                                        helperText="Time of the day to update"
                                    />
                                    <DatePicker
                                        openTo="date"
                                        clearable
                                        views={["date"]}
                                        format="dd/MM"
                                        label="Date"
                                        value={date}
                                        onChange={e => setDate(e)}
                                        helperText="Date to update"
                                    />
                                </div>
                                :
                                <div>
                                    <TimePicker
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        format="HH:mm:ss"
                                        label="Time"
                                        value={time}
                                        onChange={e => setTime(e)}
                                        helperText={<FormattedMessage id="Widget.interval" />}
                                    />
                                    <MonthWeekDayPicker month={month} weekday={weekday} setMonth={setMonth} setWeekDay={setWeekDay} />
                                </div>
                            }
                        </MuiPickersUtilsProvider>
                        <DialogContentText>
                        </DialogContentText>
                        <FormControlLabel
                            control={<Checkbox value="date" onChange={e => setIsSpecificDate(e.target.checked)} />}
                            label={<FormattedMessage id="Widget.checkbox" />}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <FormattedMessage id="Widget.cancel" />
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        <FormattedMessage id="Widget.button" />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}