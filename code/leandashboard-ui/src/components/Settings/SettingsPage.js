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
import {I18nProvider,LOCALES} from '../../i18n'
import CreateAccountDialog from './CreateAccountDialog'
import Button from '@material-ui/core/Button';
import {FormattedMessage} from 'react-intl';
import Language from '../Common/Language';


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
    const [language, setLanguage] = useState(localStorage.getItem("key"));
    const [showDialog, setShowDialog] = useState(false)

    const handleChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem("key",event.target.value)
        window.location.reload();
    };

    function handleOpenDialog() {
        setShowDialog(true)
    }
    
    const page = () => {
        return(
            <div>             
                <Typography variant="h5" noWrap color="textPrimary"><FormattedMessage id="Settings.settings" name={"Lean Dashboard"}/></Typography>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                        <Typography>
                            <FormattedMessage id="Settings.language"/>
                        </Typography>
                <Language/>
                </Box>
        </Box>
                 <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">

                 <CreateAccountDialog showDialog={showDialog} setShowDialog={setShowDialog} />
                        <Button color="primary" onClick={handleOpenDialog}><FormattedMessage id="Settings.createAccount"/></Button>
                </Box>
            </div>
        ) 
    }

    return(
        <NavBar component={page()}/>
    )
}