import { Divider, Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import GoBack from "../Common/GoBack";
import CredentialsList from "../Credentials/CredentialsList";
import AddCredentials from './AddCredentials';
import AddMemberForm from './AddMemberForm';
import NameDescForm from "./NameDescForm";
import ProjectUsersList from "./ProjectUsersList";
import {  useParams } from "react-router-dom";

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

export default function ProjectSettings({ project, update, users, deleteUser }) {
  const classes = useStyles()
  const [refresh, setRefresh] = useState(false)
  let { id, dashboardId } = useParams();
  function doRefresh() {
    setRefresh(!refresh)
  }
  return (
    <List className={classes.list}>
      <GoBack link={`/projects/${id}/dashboards`}/>
      <Typography style={{marginRight:"5%"}}component="h1" variant="h4">
        {project.name} <FormattedMessage id="ProjectSettings.settings" />
      </Typography>
      <NameDescForm project={project} updateProject={update} />
      <p />
      <Divider variant="middle" />
      <p />
      <AddMemberForm refresh={update} />
      <p />
      <ProjectUsersList users={users} refresh={doRefresh} deleteUser={deleteUser} />
      <p />
      <Divider variant="middle" />
      <p />
      <AddCredentials project={project} doRefresh={doRefresh} />
      <CredentialsList refresh={refresh} doRefresh={doRefresh} />
    </List>
  )
}