import NavBar from '../Common/NavBar'
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState, useContext, useEffect } from 'react'
import {useHistory } from 'react-router'
import CreateAccountDialog from './CreateAccountDialog'
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Language from '../Common/Language';
import UserContext from '../../common/UserContext';
import useFetch from 'use-http'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SettingsPage() {
    const classes = useStyles();
    const [language, setLanguage] = useState(localStorage.getItem("key"));
    const [showDialog, setShowDialog] = useState(false)
    const [userIsSuperuser, setUserIsSuperuser] = useState(true)
    const { get } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        checkIfUserIsSuperuser()
            .then(() => console.log(`User is superuser: ${userIsSuperuser}`))
    }, [userIsSuperuser])

    const handleChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem("key", event.target.value)
        window.location.reload();
    };

    function handleOpenDialog() {
        setShowDialog(true)
    }

    async function checkIfUserIsSuperuser() {
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        if (userInfo.id === 1) {
            setUserIsSuperuser(true)
        } else {
            setUserIsSuperuser(false)
        }
    }

    const page = () => {
        return (
            <div>
                <Typography variant="h5" noWrap color="textPrimary"><FormattedMessage id="Settings.settings" name={"Lean Dashboard"} /></Typography>
                <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} bgcolor="background.paper">
                        <Typography>
                            <FormattedMessage id="Settings.language" />
                        </Typography>
                        <Language color={false} />
                    </Box>
                </Box>
                {
                    userIsSuperuser ?
                        <div>
                            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">

                                <CreateAccountDialog showDialog={showDialog} setShowDialog={setShowDialog} />
                                <Button color="primary" onClick={handleOpenDialog}><FormattedMessage id="Settings.createAccount" /></Button>
                            </Box>
                            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                                <Button color="primary" onClick={() => history.push('/users')}><FormattedMessage id="Settings.userManagement" /></Button>
                            </Box>
                        </div>
                        :
                        null
                }
            </div>
        )
    }

    return (
        <NavBar component={page()} />
    )
}