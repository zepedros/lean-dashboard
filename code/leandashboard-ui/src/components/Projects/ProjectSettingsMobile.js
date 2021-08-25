import { Container, Divider, Typography } from "@material-ui/core";
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

export default function ProjectSettingsMobile({ project, update, users, deleteUser }) {
  const classes = useStyles()
  const [refresh, setRefresh] = useState(false)
  let { id, dashboardId } = useParams();

  function doRefresh() {
    setRefresh(!refresh)
  }
  return (
    <Container className={classes.container}>
      <List className={classes.list}>
        <GoBack link={`/projects/${id}/dashboards`}/>
        <Typography component="h1" variant="h4">
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
    </Container>
  )
}