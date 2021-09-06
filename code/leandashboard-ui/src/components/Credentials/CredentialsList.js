import { CircularProgress, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import UserContext from '../../common/UserContext';
import CredentialsItem from './CredentialsItem';
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

export default function CredentialsList({ refresh, doRefresh }) {
  const classes = useStyles();
  const [credentials, setCredentials] = useState([])
  const [userIsManager, setUserIsManager] = useState(false)
  const { get, response, loading } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
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
    if(getCredentials.statusCode){
      setCredentials([])
    }
    else {
      console.log(getCredentials)
      setCredentials(getCredentials)
    }
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

  function handleFilter() {
    setShowFilter(!showFilter)
  }

  //TODO A PARTE QUE O BOTAO DO FILTRO LIGA
  return (
    <div>
      {loading && <CircularProgress color="primary"/>}
      <Container className={classes.root}>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="ProjectSettings.credentials" />
        </Typography>
        <IconButton end='end' className={classes.filter} onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
        <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
          {credentials && credentials.map(credential => {
            return <CredentialsItem key={credential.credentials} credential={credential.credentials} refresh={doRefresh} credId={credential.id}/>
          })}
        </List>
      </Container>
    </div>
  );
}