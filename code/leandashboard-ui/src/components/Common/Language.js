import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {I18nProvider,LOCALES} from '../../i18n'
import { useState } from 'react'
import {FormattedMessage} from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
     margin: theme.spacing(1),
      minWidth: 120,
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "20px",
      marginLeft: "38px",
      display: "inline-block"
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Language({color}) {
    
    const classes = useStyles();
    const [language, setLanguage] = useState(localStorage.getItem("key"));

    const handleChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem("key",event.target.value)
        window.location.reload();
    };

    return(
       
                        <FormControl variant="outlined" className={classes.formControl}>
                            
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            onChange={handleChange}
                            style={{ color: "white" }}
                            >
                            <MenuItem value={LOCALES.ENGLISH} style={{ color: "white" }}>English</MenuItem>
                            <MenuItem value={LOCALES.PORTUGUESE} style={{ color: "white" }}>Português</MenuItem>
                            <MenuItem value={LOCALES.FRENCH} style={{ color: "white" }}>Fançais</MenuItem>
                            </Select>
                        </FormControl>
          
    )
}