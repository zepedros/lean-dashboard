import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
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
});


export default function ProjectsList({ projects }) {


  return (
    <div style={{overflowY: 'scroll', whiteSpace: 'nowrap'}}>
      <Typography component="h1" variant="h5">
        My Projects
      </Typography>
      <Hidden smDown implementation="css">
        {
          projects.map(project => {
            return <ProjectItem key={project.pid} project={project} />
          })
        }
      </Hidden>
      <Hidden mdUp implementation="css">
        <List dense={false}>
          {
            projects.map(project => {
              return <ProjectItem key={project.pid} project={project} />
            })
          }
        </List>
        <Grid container justify="flex-end">
        <Fab color="primary" aria-label="add" >
        <AddIcon />
      </Fab>
      </Grid>
      </Hidden>
    </div>
  );
}


/*
<div>
          <Grid item xs={12}>
          <div>
            <List dense={false}>
              {
                  projects.map(project => {
                      return <ProjectItem key={project.pid} project={project} />
                  })
              }
            </List>
          </div>
        </Grid>
      </div>
*/
