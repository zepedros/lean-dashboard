import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from "react-router-dom";
import FAB from '../Common/FAB';
import DashboardItem from './DashboardItem';

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

export default function DashboardsList({ dashboards, refresh, userIsManager }) {
  const classes = useStyles();
  const [showFilter, setShowFilter] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  let { id } = useParams();
  function handleFilter() {
    setShowFilter(!showFilter)
  }
  function handleOpenDialog() {
    setShowDialog(true)
  }

  return (
    <div>
      <Container className={classes.root}>
        <Typography component="h1" variant="h5">
        <FormattedMessage id="Dashboards.dashboards" />

        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {
            dashboards.map(dashboard => {
              return <DashboardItem key={dashboard.id} dashboard={dashboard} />
            })
          }
        </List>
        {
          userIsManager?
          <FAB addTitle={<FormattedMessage id="Dashboards.VerticalButton.firstButton" />} settingsTitle={<FormattedMessage id="Dashboards.VerticalButton.secondButton" />} refresh={refresh} refreshDashboards={refresh} show={false} path={`/projects/${id}/settings`} function={handleOpenDialog} showDialog={showDialog} setShowDialog={setShowDialog} />
          :
          null
        }
      </Container>
    </div>
  );
}