import React from 'react';
import { useState } from 'react'
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
  const [showFilter, setShowFilter] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const rows = users ? users.map(user => { return createData(user.username, user.id) }) : undefined

  function handleOpenDialog() {
    setShowDialog(true)
  }

  console.log(users)

  return (
    <div>
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
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button align="right">
                      <DeleteIcon color="primary"></DeleteIcon>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}