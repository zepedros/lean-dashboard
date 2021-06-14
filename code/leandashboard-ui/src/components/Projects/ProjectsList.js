import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

export default function ProjectsList({projects}) {

    return (
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
    );
}