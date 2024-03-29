import { CircularProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useFetch from 'use-http';
import GoBack from '../Common/GoBack';
import AddWidgetDialog from './AddWidgetDialog';
import TemplateWidget from './TemplateWidget';
import { useParams } from "react-router-dom";

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
  container: {
    marginLeft: '-2.2%',
    width: '94%'
},
card: {
  display: 'flex',
  flexDirection: 'column',
  textAlign: "bottom",
  width: "300px",
  //height: "410px",
},
}));

export default function AddWidget() {
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
        console.log(template)
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
      <GoBack />
      {loading && <CircularProgress />}
      <Container maxWidth={false} className={classes.container}>
      <RadioGroup row aria-label="gender" onChange={handleChange}>
        <Grid container spacing={2}>
          {templates.map((template) =>
            <FormControlLabel
              control={<Radio />}
              value={template.id}
              key={template.id}
              label={
                <>
                <Grid item md={12} sm={12}>
                  <Card className={classes.card}>
                    <TemplateWidget type={template.type} widget={template} />
                  </Card>
                  </Grid>
                  <Typography component="h1" variant="h6">
                    {template.name}
                  </Typography>
                  <Typography component="h1" variant="h6">
                    <FormattedMessage id="Widget.source"/>: {template.source}
                  </Typography>
                </>
              }
            />
          )}
        </Grid>
      </RadioGroup >
      </Container>
      <AddWidgetDialog showDialog={activeDialog} setShowDialog={setDialog} source={sourceTemplate} templateId={selectTemplate}  templateParams={selectParams}/>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => { handleDialog() }}
      >
        <FormattedMessage id="Widget.button"/>
      </Button>
    </div >
  )
}