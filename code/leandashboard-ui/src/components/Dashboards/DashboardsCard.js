import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: "bottom",
    width: "180px",
    height: "150px",
    backgroundColor: '',
  },
});
//const colorCards = ['#FFE633', '#339FFF', '#3CAA91', '#7FAA3C']
export default function DashboardsCard({ dashboard,user }) {
  const classes = useStyles();
  console.log(user)
  return (
    <Grid item key={dashboard.id} md={3}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <DashboardIcon fontSize="large" style={{ fill: "black" }} />
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={{
              pathname:`dashboards/${dashboard.id}/`,
              state: {
                  userIsManager: user
              }
            }}>
              {dashboard.name}
            </Link>
           
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
/*
 <Link href={`dashboards/${dashboard.id}/`} color="inherit">
              {dashboard.name}
            </Link>
*/