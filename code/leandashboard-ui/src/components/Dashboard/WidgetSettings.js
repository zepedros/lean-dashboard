import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import { Container } from '@material-ui/core';
import {  Grid } from '@material-ui/core';
import WidgetSettingsWidget from '../Widgets/WidgetSettingsWidget';
import { useParams } from 'react-router';
import WidgetSettingsDialog from './WidgetSettingsDialog';
import GoBack from '../Common/GoBack';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing(1),
        position: "fixed",
        right: '1%',
        bottom: '5%',
        background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    filter: {
        position: "relative",
        left: "45%"
    },
    dashboardTitle: {
        marginTop: '-2%',
        textAlign: 'left',
        marginLeft: '0%',
        color: '#3CAA91'
    },
    container: {
        marginLeft: '-2.2%',
        width: '94%'
    }
}));

export default function WidgetSettings({ name, widgets, refresh, doRefresh }) {
    const classes = useStyles();
    const [selectWidget, setSelectWidget] = useState('');
    const [widget, setWidget] = useState();
    const [credentialsProject, setCredentials] = useState([])
    const [activeDialog, setDialog] = useState(false);
    let { id, dashboardId } = useParams();

    const { get, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    async function getWidget(wId) {
        const widgetResponse = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${wId}`)
        if (response.ok) {
            setWidget(widgetResponse)
        } else {
            alert('Error obtaining widget settings')
        }
    }

    useEffect(() => { loadCredentials() }, [refresh])

    async function loadCredentials() {
        const getCredentials = await get(`api/lean/projects/${id}/credentials`)
        console.log('AAAAAAAAAAAA')
        console.log(getCredentials)
        if (response.ok) setCredentials(getCredentials)
    }

    async function handleDialog() {
        if (!selectWidget) return alert('Please select a widget')
        await getWidget(selectWidget)
        setDialog(true)
    }
    console.log(widgets)
    return (
        <div>
            <GoBack/>
            {
                widgets &&
                <div>
                    <Typography component="h1" variant="h3" className={classes.dashboardTitle}>
                        {name}
                    </Typography>
                    <Container maxWidth="false" className={classes.container} onChange={e => setSelectWidget(e.target.value)}>
                        <Grid container spacing={3} >
                            <RadioGroup row aria-label="gender" >
                                {widgets.map((widget) =>
                                    <FormControlLabel
                                        control={<Radio />}
                                        value={widget}
                                        label={
                                            <WidgetSettingsWidget widgetId={widget} />
                                        }
                                    />
                                )}
                            </RadioGroup >
                        </Grid>
                    </Container>
                </div>
            }
            <WidgetSettingsDialog openDialog={activeDialog} setOpenDialog={setDialog} widget={widget} credentialsProject={credentialsProject} refresh={doRefresh} />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => { handleDialog() }}
            >
                Edit
            </Button>
        </div >
    )
}