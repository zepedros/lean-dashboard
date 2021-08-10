import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { FormControlLabel } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import MonthWeekDayPicker from "../Widgets/MonthWeekDayPicker";
import { Select } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import Checkbox from '@material-ui/core/Checkbox';
import { DialogTitle } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { useFetch } from "use-http";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";

export default function WidgetSettingsDialog({ openDialog, setOpenDialog, widget, credentialsProject, refresh }) {
    console.log(credentialsProject)
    const [isSpecificDate, setIsSpecificDate] = useState(true)
    const [selectedCredential, setSelectedCredential] = useState("")
    const [params, setParams] = useState([])
    const [time, setTime] = useState()
    const [deleteOpenDialog, setDeleteOpenDialog] = useState(false);
    const [date, setDate] = useState()
    const [month, setMonth] = useState("*")
    const [weekday, setWeekDay] = useState("*")
    const { del, put, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();
    const history = useHistory()
    function cronToDate() {
        setSelectedCredential(widget.credentials.name)
        setParams(widget.params)
        const cron = widget.updateTime
        let time = new Date()
        const hours = cron.hours === '*' ? 0 : (cron.hours[0] === '*' ? cron.hours.substring(2) : cron.hours)
        const minutes = cron.minutes === '*' ? 0 : (cron.minutes[0] === '*' ? cron.minutes.substring(2) : cron.minutes)
        const seconds = cron.seconds === '*' ? 0 : (cron.seconds[0] === '*' ? cron.seconds.substring(2) : cron.seconds)
        const dayOfMonth = cron.dayOfMonth === '*' ? 0 : (cron.dayOfMonth[0] === '*' ? cron.dayOfMonth.substring(2) : cron.dayOfMonth)
        const month = cron.month === '*' ? 0 : (cron.month[0] === '*' ? cron.month.substring(2) : cron.month)
        const dayOfWeek = cron.dayOfWeek === '*' ? 0 : (cron.dayOfWeek[0] === '*' ? cron.dayOfWeek.substring(2) : cron.dayOfWeek)

        time.setHours(hours, minutes, seconds)
        let date = new Date()
        if (cron.dayOfMonth === '*' || cron.dayOfWeek === '*' || cron.month === '*') {
            if (cron.dayOfWeek === '*') setWeekDay('*')
            else setWeekDay(dayOfWeek)
            if (cron.month === '*') setMonth('*')
            else setMonth(month)
            setIsSpecificDate(false)
        } else {
            date.setMonth(month, dayOfMonth)
        }
        setDate(date)
        setTime(time)
    }

    const makeParams = () => {
        let result = []
        for (let i = 0; i < params.length; i++) {
            result.push(<TextField
                margin="dense"
                id={params[i]}
                defaultValue={params[i]}
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

    async function handleDelete() {
        await del(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widget.id}`)
        if (response.status === 200) {
            alert(`Deleted widget successfully`)
            refresh()
        } else {
            alert('Error deleting widget')
        }
        setOpenDialog(false)
        handleDeleteClose()
    }

    function handleDeleteClose() {
        setDeleteOpenDialog(false)
    }

    const deleteDialog = () => {
        return (
            <Dialog
                open={deleteOpenDialog}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Do you want to delete this widget?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting a widget is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    function handleSubmit() {
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
        //TODO POST
        const body = {
            timeSettings: timeSettings,
            credentials: selectedCredential,
            params: params
        }
        console.log(timeSettings)
        async function editWidget(body) {
            return await put(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widget.id}`, body)
        }
        editWidget(body).then(putresp => {
            console.log(putresp)
            if (putresp.statusCode === 200) {
                alert("Widget Updated!")
                history.push(`/projects/${id}/dashboards/${dashboardId}/settings`);
            } else {
                alert("Error updating Widget")
                console.log('no post')
            }
        })
        handleClose()
    }

    function handleClose() {
        setOpenDialog(false)
    }
    return (
        <div>
            {widget &&
                <Dialog open={openDialog} onEnter={cronToDate} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><FormattedMessage id="Widget.config" /></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormattedMessage id="Widget.subTitle" />
                        </DialogContentText>
                        <form>
                            <Select
                                native
                                onChange={event => setSelectedCredential(event.target.value)}
                                value={selectedCredential}
                                input={<Input id="grouped-native-select" />}
                            >
                                {credentialsProject.map(cp => {
                                    if (cp.credentials.source == widget.credentials.source) {
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
                                control={<Checkbox checked={isSpecificDate} value={isSpecificDate} onChange={e => setIsSpecificDate(e.target.checked)} />}
                                label={<FormattedMessage id="Widget.checkbox" />}
                            />
                        </form>
                    </DialogContent>
                    {deleteDialog()}
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={() => setDeleteOpenDialog(true)} color="primary">
                            Delete
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )
}