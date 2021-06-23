import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import useFetch from 'use-http'
import { UserProvider } from '../../common/UserContext'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Copyright from './CopyRight'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: '`url(${img})`',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 800,
    color: "#00000",
    textAlign: "left",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#3CAA91",
    color: "white"
  },
  input: {
    color: "#3CAA91"
  },
  checkbox: {
    color: "#3CAA91",
    "&$checked": {
      color: "#3CAA91"
    }
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const [Username, SetUsername] = useState("")
  const [Password, SetPassword] = useState("")
  const [loggedIn, SetLoggedIn] = useState()
  const [remember, setRemember] = useState(false)
  const { post, response } = useFetch('http://localhost:3000/api', { credentials: "same-origin" })

  async function handleSubmit() {
    if (!Username) {
      alert('Please insert a Username')
      return
    }
    if (!Password) {
      alert('Please insert a Password')
      return
    }
    if (props.login) {
      await post("/lean/login", { username: Username, password: Password })
      if (response.ok) {
        SetLoggedIn(Username)
        if (remember) {
          localStorage.setItem('lean-dashboard-user', JSON.stringify({ username: Username, password: Password }))
        }
      } else { //means an error occured
        alert(response.data.message)
      }
    } else {
      //do register
      alert('register!')
    }
    SetUsername("")
    SetPassword("")
  }

  return (
    <form className={classes.form} noValidate component={classes.button}>
      <TextField

        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="usermane"
        label="Username"
        name="username"
        onChange={e => SetUsername(e.target.value)}
        autoComplete="username"
        autoFocus
        border="1px red"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        onChange={e => SetPassword(e.target.value)}
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" onChange={e => setRemember(e.target.checked)} />}
        label="Remember me"
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        className={classes.submit}
      >
        {props.button}
      </Button>

      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2" className={classes.input}>
            Forgot password?
          </Link>

        </Grid>
        {loggedIn && <UserProvider Username={loggedIn} />}
      </Grid>

      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  )


}
