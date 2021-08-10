import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DashboardsCard from './DashboardsCard'
import VerticalButton from '../Common/VerticalButton'
import {FormattedMessage} from 'react-intl';

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

export default function DashboardsCards({ dashboards, refresh, userIsManager }) {
  const classes = useStyles();
  //  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md" >
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
        <FormattedMessage id="Dashboards.dashboards" /> 
        </Typography>
        <Grid container spacing={5}>
          {
            dashboards.map((dashboard) => {
              return <DashboardsCard key={dashboard.id} dashboard={dashboard} />
            })
          }
        </Grid>
        {
          userIsManager?
          <VerticalButton title1={<FormattedMessage id="Dashboards.VerticalButton.firstButton" />}
                          title2={<FormattedMessage id="Dashboards.VerticalButton.secondButton" />}
                           title={<FormattedMessage id="Dashboards.dialogButton.title" />} 
                           refresh={refresh} 
                           type={<FormattedMessage id="Dashboards.dialogButton.subTitle" />} 
                           show={false} 
                           settings={true}/>
          :
          null
        }
      </Container>
    </div>
  );
}