import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import Card from '@material-ui/core/Card';
 import CardContent from '@material-ui/core/CardContent';
 import Button from '@material-ui/core/Button';
 import Typography from '@material-ui/core/Typography';
 import Grid from '@material-ui/core/Grid';
 import Link from '@material-ui/core/Link';
 import BarChartIcon from '@material-ui/icons/BarChart';
 import PieChartIcon from '@material-ui/icons/PieChart';
 import DashboardIcon from '@material-ui/icons/Dashboard';

 const useStyles = makeStyles({
     root: {
       minWidth: 275,
     },
     card: {

         display: 'flex',
         flexDirection: 'column',
         textAlign: "bottom",
         width: "180px",
         height:"150px",
         backgroundColor: '',
       },
   });
const colorCards=['#FFE633','#339FFF','#3CAA91','#7FAA3C']
 export default function DashboardsCard({ dashboard }) {
     const preventDefault = (event) => event.preventDefault();

     const classes = useStyles();
 return(
     <Grid item key={dashboard} sm={6} md={4}>
     <Card className={classes.card}>
       <CardContent className={classes.cardContent}>      
            <DashboardIcon fontSize="large" style={{fill: "black"}}/>
        
         <Typography gutterBottom variant="h5" component="h2">
         <Button color='primary'>
                 {dashboard.name}
           </Button>
           </Typography>
       </CardContent>
     </Card>
   </Grid>
 )
 } 