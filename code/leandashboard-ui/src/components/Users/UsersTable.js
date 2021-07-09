import React from 'react';
import { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { NavLink } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddDialog from '../Common/AddDialog.js'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TuneIcon from '@material-ui/icons/Tune';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(username, id) {
  return { username, id };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
    position: "relative",
    right: -350,
    bottom: 0,
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  filter: {
    position: "relative",
    left: "45%"
  },
  root: {
    backgroundColor: 'orange'
  }
}));

export default function CustomizedTables({ projects: users, refresh, deleteIconOnClick }) {
  const classes = useStyles();
  const [userToDelete, setUserToDelete] = useState()
  const [selectedUserRoles, setSelectedUserRoles] = useState([])
  const rows = users ? users.map(user => { return createData(user.username, user.id) }) : undefined
  const [deleteOpenDialog, setDeleteOpenDialog] = React.useState(false);
  const [rolesOpenDialog, setRolesOpenDialog] = useState(false)


  useEffect(() => {
    console.log('User to delete is ' + userToDelete);
  }, [userToDelete])

  const handleDeleteClickOpen = (username) => {
    setUserToDelete(username)
    setDeleteOpenDialog(true);
  };

  const handleDeleteClose = () => {
    setUserToDelete(undefined)
    setDeleteOpenDialog(false);
  };

  const handleRolesClickOpen = (username) => {
    setSelectedUserRoles()
    setRolesOpenDialog(true);
  };

  const handleRolesClickClose = () => {
    setSelectedUserRoles([])
    setRolesOpenDialog(false);
  };


  const deleteDialog = () => {
    return (
      <Dialog
        open={deleteOpenDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to delete ${userToDelete}'s account?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a user account is not reversible and will remove that user from all it's projects
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteIconOnClick(userToDelete)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const userRolesDialog = () => {
    return (
      <Dialog
        open={rolesOpenDialog}
        onClose={handleRolesClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`User Roles`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleRolesClickClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }





  console.log(users)

  return (
    <div>
      <Container maxWidth="md">
        <Typography component="h1" variant="h5">
          Lean Dashboard Users
        </Typography>
        <Paper >
          <TableContainer component={Paper} elevation={3} style={{ maxHeight: 480 }}>
            <IconButton aria-label="filter list" className={classes.filter}>
              <FilterListIcon />
            </IconButton>
            <Table className={classes.table} aria-label="customized table" >
              <TableHead className={classes.root}>
                <TableRow>
                  <StyledTableCell align="center">User</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell
                      align="center">{row.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button align="right" onClick={() => handleRolesClickOpen(row.username)}> 
                        <TuneIcon color="primary"></TuneIcon>
                      </Button>
                      <Button align="right" onClick={() => handleDeleteClickOpen(row.username)}>
                        <DeleteIcon color="primary"></DeleteIcon>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      {
        deleteDialog()
      }
      {
        userRolesDialog()
      }
    </div>
  );
}