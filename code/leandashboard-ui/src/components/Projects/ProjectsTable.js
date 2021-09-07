import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AddDialog from '../Common/AddDialog.js';
import CircularProgressWithLabel from '../Common/CircularProgressWithLabel';

function createData(id, project, state, manager, completion) {
  return { id, project, state, manager, completion };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'project', numeric: false, disablePadding: true, label: <FormattedMessage id="Projects.project" /> },
  { id: 'state', numeric: true, disablePadding: false, label: <FormattedMessage id="Projects.state" /> },
  { id: 'owner', numeric: true, disablePadding: false, label: <FormattedMessage id="Projects.manager" /> },
  { id: 'completion', numeric: true, disablePadding: false, label: <FormattedMessage id="Projects.completion" /> },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.root}>
      <TableRow >

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            aria-labelledby="tableTitle"

          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  root: {
    backgroundColor: '#3CAA91'
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        <FormattedMessage id="Projects.projects" />
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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

}));

export default function EnhancedTable({ projects, refresh, userIsManager }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const completionData = (project) => {

    const totalDays = (new Date(project.endDate) - new Date(project.startDate)) / (1000 * 3600 * 24)
    const passDays = (new Date() - new Date(project.startDate)) / (1000 * 3600 * 24)
    let percentageDaysMissing = passDays * 100 / totalDays
    if (percentageDaysMissing >= 100) percentageDaysMissing = 100
    project.completion = percentageDaysMissing.toFixed(1)

    return percentageDaysMissing
  }
  const rows = projects ? projects.map(project => { { completionData(project) } return createData(project.id, project.name, project.state, project.owner, project.completion) }) : undefined
  const [showDialog, setShowDialog] = useState(false)

  function handleOpenDialog() {
    setShowDialog(true)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer component={Paper} elevation={3} style={{ maxHeight: 400 }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >

                      <TableCell  id={labelId} scope="row" align="center" padding="none">
                        <Link href={`projects/${row.id}/dashboards`} color="inherit">
                        {row.project}
                        </Link>
                      </TableCell>

                      <TableCell align="center" ><Chip
                        color="primary"
                        style={{ backgroundColor: '#3CAA91' }}
                        label={row.state}
                        size="small"
                      /></TableCell>
                      <TableCell align="center">{row.manager}</TableCell>
                      <TableCell align="center"><CircularProgressWithLabel value={row.completion} /></TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
      <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={<FormattedMessage id="Projects.dialogButton.title" />} type={<FormattedMessage id="Projects.dialogButton.subTitle" />} refreshProjects={refresh} showDate={true} />
      {
        userIsManager ?
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            <FormattedMessage id="Projects.button" />
          </Button>
          :
          null
      }
    </div>
  );
}
