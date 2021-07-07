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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress, Grid } from '@material-ui/core';
import WidgetSettingsWidget from '../Widgets/WidgetSettingsWidget';

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

export default function WidgetSettings({ name, widgets }) {
    const classes = useStyles();
    const [selectWidget, setSelectWidget] = useState('');
    const [activeDialog, setDialog] = useState(false);

    const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    /*const handleChange = (event) => {
        setSelectTemplate(event.target.value)
        templates.map(template => {
            if (template.id === event.target.value) {
                setSourceTemplate(template.source)
            }
        })
    };*/

    function handleDialog() {
        if (!selectWidget) return alert('Please select a widget')
        setDialog(true)
    }
    console.log(widgets)
    return (
        <div>
            {
                widgets &&
                <div>
                    <Typography component="h1" variant="h3" className={classes.dashboardTitle}>
                        {name}
                    </Typography>
                    <Container maxWidth="false" className={classes.container}>
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