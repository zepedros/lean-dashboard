import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CredentialsCard from './CredentialsCard';
import UserContext from '../../common/UserContext';
import { FormattedMessage } from 'react-intl';
import { useFetch } from 'use-http';
import { useParams } from 'react-router';
import { useState, useContext, useEffect } from 'react';

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
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  button: {
    Width: "72px",
    Height: "25px",
    Top: "977px",
    Left: "1172px",
    Blend: "Pass through",
  }
}));

export default function CredentialsCards({refresh}) {
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

  //  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md" >
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          <FormattedMessage id="ProjectSettings.credentials" />
        </Typography>
        <Grid container spacing={2}>
          {
            credentials.map((credential) => {
              console.log(credential)
              return <CredentialsCard key={credential.id} credential={credential.credentials} />
            })
          }
        </Grid>
      </Container>
    </div>
  );
}