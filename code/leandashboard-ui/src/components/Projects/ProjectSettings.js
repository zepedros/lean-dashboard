import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { FormattedMessage } from 'react-intl';
import CredentialsList from "../Credentials/CredentialsList";
import {useState} from 'react'
import GoBack from "../Common/GoBack";
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
    textAlign: "center"
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ProjectSettings({ project, update }) {
  const classes = useStyles()
  const [refresh, setRefresh] = useState(false)
  function doRefresh() {
    setRefresh(!refresh)
  }
  return (
    
   
      
      <List className={classes.list}>
         <div>
      <GoBack />
        <Typography component="h1" variant="h4">
          {project.name} <FormattedMessage id="ProjectSettings.settings" />
        </Typography>
        </div>
        <NameDescForm project={project} updateProject={update} />
        <AddMemberForm />
        <AddCredentials project={project} doRefresh={doRefresh}/>
        <CredentialsList refresh={refresh} doRefresh={doRefresh}/>
      </List>
  )
}