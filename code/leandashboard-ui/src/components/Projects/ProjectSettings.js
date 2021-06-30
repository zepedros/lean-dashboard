import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddMemberForm from './AddMemberForm'
import AddCredentials from './AddCredentials'
import NameDescForm from "./NameDescForm";

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
}));

export default function ProjectSettings() {
  return (
    <div>
      <Typography component="h1" variant="h4">
        {testITems.name} Settings
      </Typography>
      <NameDescForm project={testITems} />
      <AddMemberForm />
      <AddCredentials project={testITems} />
    </div>
  )
}