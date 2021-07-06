import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Container } from "@material-ui/core";
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

export default function ProjectSettingsMobile({project, update}) {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <List className={classes.list}>
        <Typography component="h1" variant="h4">
          {project.name} Settings
        </Typography>
        <NameDescForm project={project} updateProject={update}/>
        <AddMemberForm />
        <AddCredentials project={project} />
      </List>
    </Container>
  )
}