import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    const classes = useStyles();
    return (
        <Grid container>
            <form className={classes.form}>
                <Grid item>
                    <TextField
                        label=""
                        id="outlined-margin-dense"
                        defaultValue={props.project.name}
                        //className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextareaAutosize
                        rowsMax={4}
                        aria-label="maximum height"
                        defaultValue={props.project.description}
                        className={classes.descriptionText}
                    />
                </Grid>
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Grid>
    )
}