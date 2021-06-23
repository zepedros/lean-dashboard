import { InputLabel, Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import React, { useState, useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AddCredentials() {
  
    const classes = useStyles();
    const [tool, setTool] = React.useState('');
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
      setTool(event.target.value);
    };
          
  
    return (
  
        <div>
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Tools</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={tool}
                  onChange={handleChange}
                  label="Tools"
                  >
                  <MenuItem value={10}>Azure</MenuItem>
                  <MenuItem value={20}>Jira</MenuItem>
                  <MenuItem value={30}>Squash</MenuItem>
                  </Select>
              </FormControl>
              
         </div>
    );
  }