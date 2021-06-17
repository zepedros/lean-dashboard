import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import Card from '@material-ui/core/Card';
 import CardActions from '@material-ui/core/CardActions';
 import CardContent from '@material-ui/core/CardContent';
 import Button from '@material-ui/core/Button';
 import Typography from '@material-ui/core/Typography';
 import Grid from '@material-ui/core/Grid';
 import CardHeader from '@material-ui/core/CardHeader';
 import Container from '@material-ui/core/Container';
import DashboardsPage from './DashboardsPage';
import DashboardsCard from './DashboardsCard'
import FAB from '../Common/FAB'




 const useStyles = makeStyles((theme) =>({
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
         paddingLeft:"20px",
         paddingRight:"20px"
      },
      button: {
         Width: "72px",
         Height:"25px",
         Top: "977px",
         Left: "1172px",
         Blend: "Pass through"

      }


 }));

 export default function DashboardsCards({dashboards}) {
   const classes = useStyles();
   const bull = <span className={classes.bullet}>•</span>;

   return (
     <div>
      <Container className={classes.cardGrid} maxWidth="md" >
          <Typography component="h1" variant="h5">
          Dashboards
        </Typography>
            <Grid container spacing={6}>
              {dashboards.map((dashboard) => {
                  return <DashboardsCard dashboard={dashboard} />
              })
          }
            </Grid>
          </Container>
          <FAB />
      </div>
   );
 }