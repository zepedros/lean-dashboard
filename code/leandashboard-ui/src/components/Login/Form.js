import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { useContext, useState } from 'react';
import { UserContext } from '../../common/UserContext'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './CopyRight'
import { useHistory } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

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
  const [remember, setRemember] = useState(false)
  //const { post, response } = useFetch('http://localhost:3000/api', { credentials: "same-origin" })
  const context = useContext(UserContext)
  const history = useHistory()

  function handleSubmit() {
    if (!Username) {
      alert('Please insert a Username')
      return
    }
    if (!Password) {
      alert('Please insert a Password')
      return
    }

    console.log(props.login);
    if (props.login) {
      context.login(Username, Password, remember, history)
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
        label={<FormattedMessage id="login.username" /> }
        value={Username}
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
        label={<FormattedMessage id="login.password" /> }
        value={Password}
        onChange={e => SetPassword(e.target.value)}
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" onChange={e => setRemember(e.target.checked)} />}
        label={<FormattedMessage id="login.remember" /> }
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        className={classes.submit}
      >
        {props.button}
      </Button>
     
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  )
}
