import NavBar from '../Common/NavBar'
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function SettingsPage(){
    const classes = useStyles();
    const [language, setLanguage] = useState('');
  
    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const page = () => {
        return(
            <div>             
                <Typography variant="h6" noWrap color="textPrimary">Lean Dashboard Settings</Typography>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            onChange={handleChange}
                            defaultValue={10}
                            >
                            <MenuItem value={10}>English</MenuItem>
                            <MenuItem value={20}>Português</MenuItem>
                            <MenuItem value={30}>Fançais</MenuItem>
                            <MenuItem value={40}>Español</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                 </Box>
            </div>
        ) 
    }

    return(
        <NavBar component={page()}/>
    )
}