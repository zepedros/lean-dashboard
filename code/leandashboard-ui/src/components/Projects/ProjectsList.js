import { useState } from 'react'
import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import FilterListIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
  button: {
    position: "absolute",
    right: '10%',
    bottom: '12%',
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    color: 'white',

  },
  filter: {
    position: "relative",
    left: "45%"
  },
}));


export default function ProjectsList({ projects }) {
  const classes = useStyles();
  const [showFilter, setShowFilter] = useState(false)
  function handleFilter() {
    setShowFilter(!showFilter)
  }
  //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
  return (
    <div>
      <Typography component="h1" variant="h5">
        My Projects
      </Typography>
      <IconButton end='end' className={classes.filter} onClick={handleFilter}>
        <FilterListIcon />
      </IconButton>
      <Divider variant='middle' />
      <List dense={false} style={{ maxHeight: 450, overflow: 'scroll' }}>
        {
          projects.map(project => {
            return <ProjectItem key={project.pid} project={project} />
          })
        }
      </List>
      <Grid container justify="flex-end">
        <Fab color="primary" aria-label="add" className={classes.button}>
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
