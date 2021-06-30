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
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

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
  createData('key', 'a summary', 'type', 'open'),
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    right: 60,
    bottom: 70,
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
}));

export default function CustomizedTables() {
  const classes = useStyles();
  return (
    <div>
      <Paper >
        <TableContainer component={Paper} elevation={3} style={{ maxHeight: 480 }}>
          <Typography component="h1" variant="h5" style={{ textAlign: "left" }}>
            Issues
          </Typography>
          <IconButton aria-label="filter list" className={classes.filter}>
            <FilterListIcon />
          </IconButton>
          <Table className={classes.table} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>Key</StyledTableCell>
                <StyledTableCell align="right">Summary</StyledTableCell>
                <StyledTableCell align="right">Issue Type name</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <Button color="primary">{row.project}</Button>
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
    </div>
  );
}