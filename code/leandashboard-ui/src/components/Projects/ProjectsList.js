import { Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AddDialog from '../Common/AddDialog.js';
import ProjectItem from './ProjectItem';
import { Button } from '@material-ui/core';
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

export default function ProjectsList({ projects, refresh, userIsManager }) {
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
          <FormattedMessage id="Projects.projects" />
        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {projects && projects.map(project => {
            return <ProjectItem key={project.id} project={project} />
          })}
        </List>
        <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={<FormattedMessage id="Projects.dialogButton.title" />} type={<FormattedMessage id="Projects.dialogButton.subTitle" />} refreshProjects={refresh} showDate={true} />
        {
          userIsManager ?
        <Button variant="contained" color="primary" size="small" className={classes.button} onClick={handleOpenDialog}>
          +
        </Button>
      :
      null
        }
      </Container>
    </div >
  );
}