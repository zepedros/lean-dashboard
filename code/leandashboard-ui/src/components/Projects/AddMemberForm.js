import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    roles:{
      transform:"translate(19px,70px) scale(1)"
    },
    container:{
      direction:"column",
      alignItems:"center",
      justify:"center",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    
  }));

export default function AddMemberForm() {
  
  const classes = useStyles();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
        

  return (

    
            <Grid container >
               <form className={classes.form}>
              <Grid item>
                <TextField
                  label=""
                  id="outlined-margin-dense"
                  className={classes.textField}
                  placeholder="Username"
                  margin="dense"
                  variant="outlined"
                />
                </Grid>
                <Grid item>
                
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label" >Roles</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleChange}
                label="Roles"
                >
                <MenuItem value={10}>manager</MenuItem>
                <MenuItem value={20}>admin</MenuItem>
                <MenuItem value={30}>guest</MenuItem>
                <MenuItem value={40}>Colaborator</MenuItem>
                </Select>
               
            </FormControl>
            </Grid>
            <Button variant="contained" color="primary">
                        Submit
                    </Button>
            </form>
            </Grid>
       
  );
}