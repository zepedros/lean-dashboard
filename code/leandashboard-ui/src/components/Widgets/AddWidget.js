import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BarChart from '../../images/BarChart.png'
import Typography from '@material-ui/core/Typography';
import DataTable from '../../images/DataTable.png'
import PieChart from '../../images/PieChart.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';



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
      name:"Jira sprint gauge chart",
      source: "Jira",
      id: "WoGSNHoBkBFPbxnfKv1w",
      
      
    },
    {
      name:"Jira issues data table",
      source: "Jira",
      id: "XIGSNHoBkBFPbxnfK_2I",
      
    },
    {
      name:"Squash test per iteration data table",
      source: "Squash",
      id: "XoGSNHoBkBFPbxnfLP18",
   
    }
  ];

  const images = [
    {
      img: BarChart
    },
    {
      img:DataTable
    },
    {
      img:PieChart
    }

  ]

export default function AddWidget(){
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
      setValue(event.target.value);
      };
      
    return(
        <div>
           
             <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
            {templatesWidgets.map((template)=>
                <FormControlLabel 
                    control={<Radio/>}
                    value={template.id}
                    label={
                      <>
                          <img src={images[templatesWidgets.indexOf(template)].img}  className="profile-img" width="400px" height="auto" style={{ marginRight: "5px" }} />
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
           
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Add Widget
      </Button>
        </div>
        
    )
}
