import DialogContentText from '@material-ui/core/DialogContentText';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

export default function MonthWeekDayPicker({ month, weekday, setMonth, setWeekDay }) {
    return (
        <div>
            <Select
                native
                label='Month'
                value={month}
                onChange={event => setMonth(event.target.value)}
                defaultValue="None"
                input={<Input id="grouped-native-select" />}
            >
                <option value="*">None</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </Select>
            <DialogContentText>
            </DialogContentText>
            <Select
                native
                label='Week Day'
                value={weekday}
                onChange={event => setWeekDay(event.target.value)}
                defaultValue="None"
                input={<Input id="grouped-native-select" />}
            >
                <option value="*">None</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="0">Sunday</option>
            </Select>
        </div>
    );
}