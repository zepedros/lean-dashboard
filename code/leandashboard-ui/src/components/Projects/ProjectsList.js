import { useState } from 'react'
import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Container } from '@material-ui/core';
import AddProjectDialog from './AddProjectDialog.js'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '8%',
    height: '75%',
    width: '90%'
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
    position: "fixed",
    right: '5%',
    bottom: '15%',
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
  const [showDialog, setShowDialog] = useState(false)

  function handleFilter() {
    setShowFilter(!showFilter)
  }

  function handleOpenDialog() {
    setShowDialog(true)
  }

  //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
  return (
    <div>
      <Container className={classes.root}>
        <Typography component="h1" variant="h5">
          My Projects
        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {
            projects.map(project => {
              return <ProjectItem key={project.pid} project={project} />
            })
          }
        </List>
        <AddProjectDialog showDialog={showDialog} setShowDialog={setShowDialog}/>
        <Fab color="primary" aria-label="add" className={classes.button}>
          <AddIcon onClick={handleOpenDialog} />
        </Fab>
      </Container>
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
