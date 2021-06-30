import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function AddCredentials() {
  const [selectedValue, setSelectedValue] = useState("");
  const classes = useStyles();
  const textField = (text) => {
    return (
      <Grid item>
        <TextField
          label=""
          id="outlined-margin-dense"
          className={classes.textField}
          placeholder={text}
          margin="dense"
          variant="outlined"
        />
      </Grid>
    );
  };

  const buttonSubmit = () => {
    return (
      <div>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    )
  };

  return (
    <div>
      <div>
        <Typography component="h6" variant="h6">Add Credentials</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Tools</InputLabel>
          <Select
            native
            value={selectedValue}
            onChange={event => setSelectedValue(event.target.value)}
            defaultValue=""
            input={<Input id="grouped-native-select" />}
          >
            <option value={0}>None</option>
            <option value={1}>Squash</option>
            <option value={2}>Azure</option>
            <option value={3}>Jira</option>
          </Select>
        </FormControl>
        {selectedValue === "1" && (
          <Grid container>
            <form className={classes.form}>
              {textField("Username")}
              {textField("Password")}
              {textField("API Path")}
              {buttonSubmit()}
            </form>
          </Grid>
        )}
        {selectedValue === "2" && (
          <form className={classes.form}>
            {textField("Email")}
            {textField("Token")}
            {textField("Instance")}
            {buttonSubmit()}
          </form>
        )}
        {selectedValue === "3" && (
          <Grid container>
            <form className={classes.form}>
              {textField("Email")}
              {textField("Token")}
              {textField("API Path")}
              {textField("API Version")}
              {buttonSubmit()}
            </form>
          </Grid>
        )}
      </div>
    </div>
  );
}

