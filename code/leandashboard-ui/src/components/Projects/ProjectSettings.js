import { Container, Grid, Typography } from "@material-ui/core";
import NavBar from '../Common/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'

const testITems = 
  {
      pid: 1,
      name: 'abc',
      description: 'description',
      owner: 'Manager',
      state: 'Open'
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
      textAlign:"center"
    },
  }));




export default function ProjectSettings(){
  
  const classes = useStyles();
  return (
    <div>
          <Typography component="h1" variant="h5">
            {testITems.name} Settings
          </Typography>
          <Grid container>
          <Grid item >
                <Typography align="center" component="h6" variant="h6" >
                  Name
              </Typography>
            </Grid>
            <Grid item>
              <TextField
              label=""
              id="outlined-margin-dense"
              defaultValue={testITems.name}
              className={classes.textField}
              margin="dense"
              variant="outlined"
            />
            </Grid>
          </Grid>
          <Grid container>
          <Grid item >
                <Typography align="center" component="h6" variant="h6">
                  Description
              </Typography>
            </Grid>
            <Grid item>
            <TextareaAutosize
                rowsMax={4}
                aria-label="maximum height"
                defaultValue={testITems.description}
              />
            </Grid>
          </Grid>
          <AddMemberForm />
          <Typography align="center" component="h6" variant="h6" >
              Credentials
          </Typography>
          <AddCredentials />
         
         
    </div>
  )
}