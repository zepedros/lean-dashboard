import { useState } from 'react'
import DashboardItem from './DashboardItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import FAB from '../Common/FAB'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '8%',
    height: '79%',
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

  },
  filter: {
    position: "relative",
    left: "45%"
  },
}));


export default function DashboardsList({ dashboards }) {
  const classes = useStyles();
  const [showFilter, setShowFilter] = useState(false)
  function handleFilter() {
    setShowFilter(!showFilter)
  }
  return (
    <div>
      <Container className={classes.root}>
        <Typography component="h1" variant="h5">
          Dashboards
        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {
            dashboards.map(dashboard => {
              return <DashboardItem key={dashboard.did} dashboard={dashboard} />
            })
          }
        </List>
        <FAB addTitle={"Add Dashboard"} settingsTitle={"Project Settings"} show={false}/>
      </Container>
    </div>
  );
}

/*
<Fab color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Fab>
*/