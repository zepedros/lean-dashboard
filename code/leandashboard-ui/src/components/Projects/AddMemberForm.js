import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function AddMemberForm() {
  
  const classes = useStyles();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
        

  return (

      <div>
          <TextField
              label=""
              id="outlined-margin-dense"
              className={classes.textField}
              placeholder="Username"
              margin="dense"
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Roles</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleChange}
                label="Roles"
                >
                <MenuItem value={10}>Project Manager</MenuItem>
                <MenuItem value={20}>User</MenuItem>
                <MenuItem value={30}>Guest</MenuItem>
                </Select>
            </FormControl>
       </div>
  );
}