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
import Chip from '@material-ui/core/Chip';
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

function createData(id, project, state, manager, completion) {
  return { id, project, state, manager, completion };
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

export default function CustomizedTables({ projects, refresh }) {
  const classes = useStyles();
  const [showFilter, setShowFilter] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const rows = projects ? projects.map(project => { return createData(project.id, project.name, project.state, project.owner) }) : undefined

  function handleOpenDialog() {
    setShowDialog(true)
  }

  console.log(projects)

  return (
    <div>
      <Typography component="h1" variant="h5">
        My Projects
      </Typography>
      <Paper >
        <TableContainer component={Paper} elevation={3} style={{ maxHeight: 480 }}>
          <IconButton aria-label="filter list" className={classes.filter}>
            <FilterListIcon />
          </IconButton>
          <Table className={classes.table} aria-label="customized table" >
            <TableHead className={classes.root}>
              <TableRow>
                <StyledTableCell>Project</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
                <StyledTableCell align="right">Manager</StyledTableCell>
                <StyledTableCell align="right">Completion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <NavLink to={`projects/${row.id}/dashboards`} style={{ textDecoration: "none" }}>
                    <Link>
                      <StyledTableCell component="th" scope="row"> <Button color="primary">{row.project}</Button></StyledTableCell>
                    </Link>
                  </NavLink>
                  <StyledTableCell align="right"><Chip
                    color="primary"
                    label={row.state}
                    size="small"
                  /></StyledTableCell>
                  <StyledTableCell align="right">{row.manager}</StyledTableCell>
                  <StyledTableCell align="right">{row.completion}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={"Add Project"} type={"Project"} refreshProjects={refresh} showDate={true} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add new
      </Button>
    </div>
  );
}