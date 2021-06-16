import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
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
    <div>
      <Typography component="h1" variant="h5">
        My Projects
      </Typography>
      <Divider variant='middle' />
      <List dense={false} style={{ maxHeight: 250, overflow: 'auto' }}>
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
