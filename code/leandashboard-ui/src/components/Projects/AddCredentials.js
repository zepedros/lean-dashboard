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
import { useFetch } from "use-http";
import { useParams } from "react-router";
import {FormattedMessage} from 'react-intl';

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
  const [credentialName, setCredentialName] = useState("")
  const [jiraCredential, setJiraCredential] = useState({ email: "", token: "", APIPath: "", APIVersion: "2" })
  const [squashCredential, setSquashCredential] = useState({ username: "", password: "", APIPath: "" })
  const [azureCredential, setAzureCredential] = useState({ email: "", token: "", Instance: "" })
  const { post, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
  let { id } = useParams();
  const classes = useStyles();
  const textField = (text, value, onChange) => {
    return (
      <Grid item>
        <TextField
          label=""
          id="outlined-margin-dense"
          className={classes.textField}
          value={value}
          placeholder={text}
          margin="dense"
          variant="outlined"
          onChange={onChange}
        />
      </Grid>
    );
  };

  const buttonSubmit = () => {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={submit}>
          <FormattedMessage id="ProjectSettings.submit"/>
        </Button>
      </div>
    )
  };

  async function submit() {
    let body
    if (selectedValue === "1") {
      body = {
        name: credentialName,
        source: "Squash",
        credential: squashCredential
      }
    }
    if (selectedValue === "2") {
      body = {
        name: credentialName,
        source: "Azure",
        credential: azureCredential
      }
    }
    if (selectedValue === "3") {
      body = {
        name: credentialName,
        source: "Jira",
        credential: jiraCredential
      }
    }
    await post(`/api/lean/projects/${id}/credentials`, body)
    if(response.status === 201) {
      alert('Credential Created')
    } else {
      alert(`${response.data.message}`)
    }
    setSquashCredential({ username: "", password: "", APIPath: "" })
    setJiraCredential({ email: "", token: "", APIPath: "", APIVersion: "2" })
    setAzureCredential({ email: "", token: "", Instance: "" })
    setCredentialName("")

  }

  return (
    <div>
      <div>
        <Typography component="h6" variant="h6"><FormattedMessage id="ProjectSettings.addCredentials"/></Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label"><FormattedMessage id="ProjectSettings.tools"/></InputLabel>
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
              {textField("Credential Name", credentialName, e => {
                setCredentialName(e.target.value)
              })}
              {textField("Username", squashCredential.username, e => {
                const aux = {
                  username: e.target.value,
                  password: squashCredential.password,
                  APIPath: squashCredential.APIPath
                }
                setSquashCredential(aux)
              })}
              {textField("Password", squashCredential.password, e => {
                const aux = {
                  username: squashCredential.username,
                  password: e.target.value,
                  APIPath: squashCredential.APIPath
                }
                setSquashCredential(aux)
              })}
              {textField("API Path", squashCredential.APIPath, e => {
                const aux = {
                  username: squashCredential.username,
                  password: squashCredential.password,
                  APIPath: e.target.value
                }
                setSquashCredential(aux)
              })}
              {buttonSubmit()}
            </form>
          </Grid>
        )}
        {selectedValue === "2" && (
          <form className={classes.form}>
            {textField("Credential Name", credentialName, e => {
              setCredentialName(e.target.value)
            })}
            {textField("Email", azureCredential.email, e => {
              const aux = {
                email: e.target.value,
                token: azureCredential.token,
                Instance: azureCredential.Instance
              }
              setAzureCredential(aux)
            })}
            {textField("Token", azureCredential.token, e => {
              const aux = {
                email: azureCredential.email,
                token: e.target.value,
                Instance: azureCredential.Instance
              }
              setAzureCredential(aux)
            })}
            {textField("Instance", azureCredential.Instance, e => {
              const aux = {
                email: azureCredential.email,
                token: azureCredential.token,
                Instance: e.target.value
              }
              setAzureCredential(aux)
            })}
            {buttonSubmit()}
          </form>
        )}
        {selectedValue === "3" && (
          <Grid container>
            <form className={classes.form}>
              {textField("Credential Name", credentialName, e => {
                setCredentialName(e.target.value)
              })}
              {textField("Email", jiraCredential.email, e => {
                const aux = {
                  email: e.target.value,
                  token: jiraCredential.token,
                  APIPath: jiraCredential.APIPath,
                  APIVersion: jiraCredential.APIVersion
                }
                setJiraCredential(aux)
              })}
              {textField("Token", jiraCredential.token, e => {
                const aux = {
                  email: jiraCredential.email,
                  token: e.target.value,
                  APIPath: jiraCredential.APIPath,
                  APIVersion: jiraCredential.APIVersion
                }
                setJiraCredential(aux)
              })}
              {textField("API Path", jiraCredential.APIPath, e => {
                const aux = {
                  email: jiraCredential.email,
                  token: jiraCredential.token,
                  APIPath: e.target.value,
                  APIVersion: jiraCredential.APIVersion
                }
                setJiraCredential(aux)
              })}
              <Select
                native
                value={jiraCredential.APIVersion}
                onChange={e => {
                  const aux = {
                    email: jiraCredential.email,
                    token: jiraCredential.token,
                    APIPath: jiraCredential.APIPath,
                    APIVersion: e.target.value
                  }
                  setJiraCredential(aux)
                }}
                defaultValue="2"
                input={<Input id="grouped-native-select" />}
              >
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
              </Select>
              {buttonSubmit()}
            </form>
          </Grid>
        )}
      </div>
    </div>
  );
}

