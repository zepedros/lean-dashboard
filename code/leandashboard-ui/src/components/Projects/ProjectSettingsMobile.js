import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Container } from "@material-ui/core";
import { FormattedMessage } from 'react-intl';
import {useState} from 'react'
import CredentialsList from "../Credentials/CredentialsList";
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
    maxHeight: '85%',
    overflow: 'scroll'
  },
  container: {
    position: 'fixed',
    top: '8%',
    height: '90%',
    width: '90%'
  }
}));

export default function ProjectSettingsMobile({ project, update }) {
  const classes = useStyles()
  const [refresh, setRefresh] = useState(false)
  function doRefresh() {
    setRefresh(!refresh)
  }
  return (
    <Container className={classes.container}>
      <List className={classes.list}>
        <Typography component="h1" variant="h4">
          {project.name} <FormattedMessage id="ProjectSettings.settings" />
        </Typography>
        <NameDescForm project={project} updateProject={update} />
        <AddMemberForm />
        <AddCredentials project={project} doRefresh={doRefresh}/>
        <CredentialsList refresh={refresh} doRefresh={doRefresh}/>
      </List>
    </Container>
  )
}