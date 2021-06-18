import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DashboardsCard from './DashboardsCard'
import VerticalButton from '../Common/VerticalButton'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
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
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  button: {
    Width: "72px",
    Height: "25px",
    Top: "977px",
    Left: "1172px",
    Blend: "Pass through",


  }


}));

export default function DashboardsCards({ dashboards }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md" >
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Dashboards
        </Typography>

        <Grid container spacing={5}>
          {
            dashboards.map((dashboard) => {
              return <DashboardsCard dashboard={dashboard} />
            })
          }
        </Grid>

        <VerticalButton />
      </Container>
    </div>
  );
}