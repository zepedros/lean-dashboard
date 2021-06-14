import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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


export default function ProjectsList({projects}) {


    return (
      <div>
            <List dense={false}>
              {
                  projects.map(project => {
                      return <ProjectItem key={project.pid} project={project} />
                  })
              }
            </List>
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
