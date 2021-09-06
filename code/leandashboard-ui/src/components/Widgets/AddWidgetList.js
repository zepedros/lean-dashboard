import { CircularProgress, Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import GoBack from "../Common/GoBack";
import AddWidgetDialog from './AddWidgetDialog';
import TemplateWidget from './TemplateWidget';
import { useParams } from "react-router-dom";

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
    const [selectParams, setSelectParams] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [sourceTemplate, setSourceTemplate] = useState('');
    const [activeDialog, setDialog] = useState(false);
    let { id, dashboardId } = useParams();

    const { get, response, loading } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => { loadTemplates() }, [])

    const handleChange = (event) => {
        setSelectTemplate(event.target.value)
        templates.map(template => {
            if (template.id === event.target.value) {
                setSourceTemplate(template.source)
                setSelectParams(template.params)
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
           
            <Container  className={classes.root}>
                
                <Grid  style={{ maxHeight: '85%', overflow: 'scroll' }}>
                <GoBack />
                    <RadioGroup  aria-label="gender" onChange={handleChange}>
                        {templates.map((template) =>
                            <FormControlLabel
                                control={<Radio />}
                                value={template.id}
                                key={template.id}
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
                <AddWidgetDialog showDialog={activeDialog} setShowDialog={setDialog} source={sourceTemplate} templateId={selectTemplate} templateParams={selectParams}/>
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