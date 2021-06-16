import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard'
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';




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

export default function ProjectsCards({projects}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
        <Typography component="h1" variant="h5">
        My Projects
      </Typography>
          <Grid container spacing={6}>
            {projects.map((project) => {
                return <ProjectCard project={project} />
            })
        }
          </Grid>
          <Grid container justify="flex-end" left="0">
          <Button variant="outlined" color="primary"  >
              Add new
          </Button>    
          </Grid>
        </Container>
  );
}

/*
  <div>
        <Grid 
           
        >
           {projects.map(project =>{
               <Grid item xs={12} sm={6} md={3} key={projects.indexOf(project)}>
                   <Card>
                       <CardHeader 
                            title={project.name}
                       />
                       <CardContent>
                           <Typography variante="h5">
                               {project.description}
                           </Typography>
                       </CardContent>
                   </Card>    
               </Grid>    
           })} 
        </Grid>    
    </div>
*/