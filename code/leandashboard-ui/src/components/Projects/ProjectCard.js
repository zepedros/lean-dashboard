import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    card: {
        
        display: 'flex',
        flexDirection: 'column',
        textAlign: "left",
        width: "150px",
        
      },
  });

export default function ProjectCard({ project }) {
    const preventDefault = (event) => event.preventDefault();

    const classes = useStyles();
return(
    <Grid item key={project} sm={6} md={4}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
            <Button color='primary'>
                {project.name}
          </Button>
        </Typography>
        <Typography>
            {project.description}  
        </Typography>
      </CardContent>
    </Card>
  </Grid>
)
}