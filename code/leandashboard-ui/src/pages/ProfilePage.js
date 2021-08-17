import { Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useFetch from 'use-http';
import UserContext from '../common/UserContext';
import NavBar from '../components/Common/NavBar';
import ChangePasswordDialog from "../components/Profile/ChangePasswordDialog";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  disabledInput: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    }
  },
  disabledInputUser: {
    "& .Mui-disabled": {
      color: "black"
    }
  }
}));

export default function ProfilePage() {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false)
  const context = useContext(UserContext)
  const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
  const [projects, setProjects] = useState(undefined)


  useEffect(() => {
    loadProjects()
    
  }, [])

  async function loadProjects() {
    const getProjects = await get('/api/lean/projects')
    if (response.ok) setProjects(getProjects)
    else setProjects([])
  }



  function handleOpenDialog() {
    setShowDialog(true)
  }

  const page = () => {
    if(projects === undefined) {
      return (
        <CircularProgress color="primary" />
      )
    }
    return (
      <div>
        {loading ?
          <CircularProgress color="primary" />
          :
          <div>
            <Typography variant="h6" noWrap color="textPrimary"><FormattedMessage id="Profile.profile" /></Typography>
            <Box display="flex" p={1} justifyContent="center" bgcolor="background.paper">

              <div className={classes.root}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" className={classes.large} />
              </div>
            </Box>
            <Box display="flex" p={1} justifyContent="center" bgcolor="background.paper">
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment"><FormattedMessage id="Profile.username" /></InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  defaultValue={context.credentials.username}
                  className={classes.disabledInputUser}
                  disabled={true}
                />
              </FormControl>
            </Box>
            <Box display="flex" p={1} bgcolor="background.paper">
              <Box flexGrow={1} justifyContent="flex-start" p={1} bgcolor="background.paper" >

                <TextField
                  label={<FormattedMessage id="Profile.numberOfProjects" />}
                  id="outlined-size-small"
                  defaultValue={projects.length}
                  variant="outlined"
                  className={classes.disabledInput}
                  size="small"
                  disabled

                />
              </Box>
            </Box>
            <Box p={1} bgcolor="background.paper" >
              <ChangePasswordDialog showDialog={showDialog} setShowDialog={setShowDialog} />
              <Button color="primary" onClick={handleOpenDialog}><FormattedMessage id="Profile.changePassowrd.button" /></Button>
            </Box>

          </div>
        }
      </div>
    )
  }

  return (
    <div>
      <NavBar component={page()} />
    </div>
  )
}