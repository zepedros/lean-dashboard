import { useState } from 'react'
import CredentialsItem from './CredentialsItem';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useContext, useEffect } from 'react'
import { useFetch } from 'use-http';
import { useParams } from 'react-router';
import UserContext from '../../common/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%'
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

export default function CredentialsList({ refresh }) {
  const classes = useStyles();
  const [credentials, setCredentials] = useState([])
  const [userIsManager, setUserIsManager] = useState(false)
  const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
  let { id } = useParams();
  const context = useContext(UserContext)

  useEffect(() => {
    loadCredentials().then(() => {
      console.log(response.data)
    })
  }, [refresh])

  useEffect(() => {
    checkIfUserIsManager()
      .then(() => console.log(`User is manager: ${userIsManager}`))
  }, [userIsManager])

  async function loadCredentials() {
    const getCredentials = await get(`/api/lean/projects/${id}/credentials`)
    console.log(getCredentials)
    if (getCredentials) {
      setCredentials(getCredentials)
    }
    else setCredentials(undefined)
  }

  async function getUsername(owner) {
    return await get(`/api/lean/users/${owner}`)
  }

  async function checkIfUserIsManager() {
    const userRoles = await get(`/api/lean/users/${context.credentials.username}/roles`)
    let userIsManager = false
    userRoles.forEach(role => {
      if (role.role === 'manager' || role.role === 'admin') {
        userIsManager = true
      }
    })
    setUserIsManager(userIsManager)
  }

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
          <FormattedMessage id="ProjectSettings.credentials" />
        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {credentials && credentials.map(credential => {
            return <CredentialsItem key={credential.id} credential={credential.credentials} />
          })}
        </List>
      </Container>
    </div>
  );
}