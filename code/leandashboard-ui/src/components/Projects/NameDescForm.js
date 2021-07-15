import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useFetch } from 'use-http';
import { useParams } from 'react-router';
import {FormattedMessage} from 'react-intl';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    descriptionText: {
        height: "35px",
        overflow: "hidden",
        margin: "0px",
        width: "194px",
    }
}));

export default function NameDescForm(props) {
    const [newName, setNewName] = useState(props.project.name)
    const [newDescription, setNewDescription] = useState(props.project.description)
    const classes = useStyles();
    const { put, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id } = useParams();

    async function submit() {
        if (!newName) {
            alert('Insert a name')
        }
        if (!newDescription) {
            alert('Insert a description')
        }
        await put(`/api/lean/projects/${id}`, { name: newName, description: newDescription })
        if (response.status === 200) {
            props.updateProject()
            alert("Project updated")
            //update
        } else {
            alert(response.data.message)
            setNewName(props.project.name)
            setNewDescription(props.project.description)
        }
    }
    return (
        <Grid container>
            <form className={classes.form}>
                <Grid item>
                    <TextField
                        label=""
                        id="outlined-margin-dense"
                        value={newName}
                        //className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        label="Project Name"
                        onChange={e => setNewName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextareaAutosize
                        rowsMax={4}
                        aria-label="maximum height"
                        value={newDescription}
                        className={classes.descriptionText}
                        label="Project Description"
                        onChange={e => setNewDescription(e.target.value)}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={submit}>
                    <FormattedMessage id="ProjectSettings.submit"/>
                </Button>
            </form>
        </Grid>
    )
}