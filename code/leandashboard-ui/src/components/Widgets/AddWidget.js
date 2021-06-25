import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BarChart1 from '../../images/BarChart.png'
import Typography from '@material-ui/core/Typography';
import DataTable from './DataTable'
import PieChart from './PieChart'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AddWidgetDialog from './AddWidgetDialog';
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import BarChart from './BarChart'




const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    right: 60,
    bottom: 70,
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

const templatesWidgets = [
  {
    name: "Jira sprint gauge chart",
    source: "Jira",
    id: "WoGSNHoBkBFPbxnfKv1w",


  },
  {
    name: "Jira issues data table",
    source: "Jira",
    id: "XIGSNHoBkBFPbxnfK_2I",

  },
  {
    name: "Squash test per iteration data table",
    source: "Squash",
    id: "XoGSNHoBkBFPbxnfLP18",

  }
];

const images = [
  {
    img: BarChart
  },
  {
    img: DataTable
  },
  {
    img: PieChart
  },
  {
    img: DataTable
  },
  {
    img: PieChart
  },
  {
    img: DataTable
  }

]

export default function AddWidget() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [templates,setTemplates] = useState([]);
  const [sourceTemplate,setSourceTemplate] = useState('');
  const [activeDialog, setDialog] = React.useState(false);
 

  const {  get, post, response, loading, error } = useFetch('http://localhost:3000/api', { credentials: "same-origin"})

  useEffect(() => {loadTemplates()},[])

  const handleChange = (event) => {
    setValue(event.target.value);
    templates.map(template=>{
      if(template.id === value)
      setSourceTemplate(template.source)
    })
  };
  
  async function loadTemplates(){
    const getTemplates= await get(`/api/lean/projects/widgets/templates`)
    if(response.ok) setTemplates(getTemplates)
  }
  
  console.log(sourceTemplate)
  return (
    <div>

      <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
        {templates.map((template) =>
          <FormControlLabel
            control={<Radio />}
            value={template.id}
            label={
              <>
                <BarChart />
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
      </RadioGroup>
      <AddWidgetDialog showDialog={activeDialog} setShowDialog={setDialog} source={sourceTemplate} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={()=>{setDialog(true)}}
      >
        Add Widget
      </Button>
    </div>

  )
}
