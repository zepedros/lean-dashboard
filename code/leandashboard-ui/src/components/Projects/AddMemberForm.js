import React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import {FormattedMessage} from 'react-intl';
import { useState } from 'react'
import { useParams } from "react-router-dom";
import useFetch from 'use-http'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  roles: {
    transform: "translate(19px,70px) scale(1)"
  },
  container: {
    direction: "column",
    alignItems: "center",
    justify: "center",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function AddMemberForm() {
  const classes = useStyles();
  const [input, setInput] = useState({ username: "" })
  const [usernameError, setUsernameError] = useState(false)
  const { post } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
  let { id } = useParams();

  function addMember(){
    if (!input.username) {
      alert('Please insert a username')
      setUsernameError(true)
      return
    }
    const body = {
      username: input.username
    }
    postAddMember(body).then(postresp => {
      console.log(postresp)
      if (postresp.statusCode === 201) {
          console.log('post done')
          alert("Add Member done!")
      } else {
          alert("Error adding member")
          console.log('no post')
      }
      setInput({ username: "" }); 
  })
    
  }
  
  async function postAddMember(body) {
    return await post(`api/lean/projects/${id}/users`, body)
}

  return (
    <Grid container >
      <form className={classes.form}>
        <Typography component="h6" variant="h6" style={{ textAlign: "center" }}> 
          <FormattedMessage id="ProjectSettings.addMembers"/>
        </Typography>
        <Grid item>
        <TextField
            label={<FormattedMessage id="Settings.username"/>}
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Username"
            margin="dense"
            variant="outlined"
            onChange={e => { setInput({ username: e.target.value }) }}
            error={usernameError}
            value={input.username}
          />
        </Grid>
        <Button variant="contained" color="primary" onClick={addMember}>
        <FormattedMessage id="ProjectSettings.submit"/>
        </Button>
      </form>
    </Grid>
  );
}