import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AddDialog from '../Common/AddDialog.js';
import UsersItem from './UsersItem';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '8%',
    height: '75%',
    width: '90%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    position: "fixed",
    right: '5%',
    bottom: '15%',
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    color: 'white',

  }
}));

export default function UsersList({ users, refresh, deleteUser, removeRoleFromUser, addRoleToUser, changeUsername, changePassword }) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false)

  function handleOpenDialog() {
    setShowDialog(true)
  }

  
  return (
    <div>
      <Container className={classes.root}>
        <Typography component="h1" variant="h5">
          Lean Dashboard Users
        </Typography>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {users && users.map(user => {
            return <UsersItem key={user.id} user={user} deleteUser={deleteUser} removeRoleFromUser={removeRoleFromUser} addRoleToUser={addRoleToUser} changeUsername={changeUsername} changePassword={changePassword} />
          })}
        </List>
        <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={<FormattedMessage id="Projects.dialogButton.title"/>} type={<FormattedMessage id="Projects.dialogButton.subTitle"/>}  refreshProjects={refresh} showDate={true} />
      </Container>
    </div>
  );
}