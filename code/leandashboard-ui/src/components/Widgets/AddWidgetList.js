import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AddWidgetDialog from './AddWidgetDialog';
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import TemplateWidget from './TemplateWidget';
import Card from '@material-ui/core/Card';
import { Container } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '8%',
        height: '79%',
        width: '90%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        position: "fixed",
        right: '5%',
        bottom: '15%',
        background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
        color: 'white',
    },
    filter: {
        position: "relative",
        left: "45%"
    },
}));

export default function AddWidgetList() {
    const classes = useStyles();
    const [selectTemplate, setSelectTemplate] = useState('');
    const [templates, setTemplates] = useState([]);
    const [sourceTemplate, setSourceTemplate] = useState('');
    const [activeDialog, setDialog] = useState(false);

    const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => { loadTemplates() }, [])

    const handleChange = (event) => {
        setSelectTemplate(event.target.value)
        templates.map(template => {
            if (template.id === event.target.value) {
                setSourceTemplate(template.source)
            }
        })
    };

    function handleDialog() {
        if (!selectTemplate) return alert('Please select a template')
        setDialog(true)
    }

    async function loadTemplates() {
        const getTemplates = await get(`/api/lean/projects/widgets/templates`)
        if (response.ok) setTemplates(getTemplates)
    }

    return (
        <div>
            {loading && <CircularProgress />}
            <Container className={classes.root}>
                <Grid alignItems="center" style={{ maxHeight: '85%', overflow: 'scroll' }}>
                    <RadioGroup column aria-label="gender" onChange={handleChange}>
                        {templates.map((template) =>
                            <FormControlLabel
                                control={<Radio />}
                                value={template.id}
                                label={
                                    <>
                                        <Card>
                                            <TemplateWidget type={template.type} widget={template} />
                                        </Card>
                                        <Typography component="h1" variant="h6">
                                            {template.name}
                                        </Typography>
                                        <Typography component="h1" variant="h6">
                                            Source: {template.source}
                                        </Typography>
                                    </>
                                }
                            />
                        )}
                    </RadioGroup >
                </Grid>
                <AddWidgetDialog showDialog={activeDialog} setShowDialog={setDialog} source={sourceTemplate} templateId={selectTemplate} />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => { handleDialog() }}
                >
                    Add Widget
                </Button>
            </Container>
        </div >
    )
}