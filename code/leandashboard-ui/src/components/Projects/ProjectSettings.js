import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import {FormattedMessage} from 'react-intl';

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
    marginBottom: theme.spacing(2),
  },
}));

export default function ProjectSettings({project, update}) {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <Typography component="h1" variant="h4">
        {project.name} <FormattedMessage id="ProjectSettings.settings"/>
      </Typography>
      <NameDescForm project={project} updateProject={update}/>
      <AddMemberForm />
      <AddCredentials project={project} />
    </List>
  )
}