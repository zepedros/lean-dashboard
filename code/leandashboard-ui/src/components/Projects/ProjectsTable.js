import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';




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

function createData(project, state, nDashboards, completion) {
  return { project, state, nDashboards, completion };
}

const rows = [
  createData('Project1', 'OPEN', 6),
  createData('Project2', 'OPEN', 9 ),
  createData('Project3', 'OPEN', 1),
  createData('Project4', 'OPEN', 3),
  createData('Project5', 'OPEN', 5),
  createData('Project6', 'OPEN', 1),
  createData('Project7', 'OPEN', 3),
  createData('Project8', 'OPEN', 5),
  createData('Project9', 'OPEN', 1),
  createData('Project10', 'OPEN', 3),
  createData('Project11', 'OPEN', 5),
  
];

const useStyles = makeStyles((theme)=> ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    right:    60,
    bottom:   130,
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  
  return (
    <div>
      <Typography component="h1" variant="h5">
            My Projects
          </Typography>
        <Paper>
        <TableContainer component={Paper} style={{maxHeight:440}}>
          <Table className={classes.table} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>Project</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
                <StyledTableCell align="right">Number of Dashboards</StyledTableCell>
                <StyledTableCell align="right">Completion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <Button>{row.project}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.state}</StyledTableCell>
                  <StyledTableCell align="right">{row.nDashboards}</StyledTableCell>
                  <StyledTableCell align="right">{row.completion}</StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<AddIcon />}
    >
      Add new
    </Button>
</div>
  );
}