import { Container, Grid, Typography } from "@material-ui/core";
import NavBar from '../Common/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";
import Divider from '@material-ui/core/Divider'


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
          <Typography component="h1" variant="h4">
            {testITems.name} Settings
          </Typography>
          <NameDescForm project={testITems}/>
          <br />
          <AddMemberForm />
          <br />
          <AddCredentials project={testITems} />

    </div>
  )
}