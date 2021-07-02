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
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress, Grid } from '@material-ui/core';

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
}));

export default function AddWidget() {
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

  console.log(templates)
  return (
    <div>
      {loading && <CircularProgress />}
      <RadioGroup row aria-label="gender" onChange={handleChange}>
        <Grid alignItems="center">
          {templates.map((template) =>
            <FormControlLabel
              control={<Radio />}
              value={template.id}
              label={
                <>
                  <Card>
                    <TemplateWidget type={template.type} data={template.data} />
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
        </Grid>
      </RadioGroup >
      <AddWidgetDialog showDialog={activeDialog} setShowDialog={setDialog} source={sourceTemplate} templateId={selectTemplate} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => { handleDialog() }}
      >
        Add Widget
      </Button>
    </div >
  )
}