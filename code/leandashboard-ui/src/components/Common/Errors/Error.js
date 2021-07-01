import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import img from '../../../images/NotFound.png'
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  linkColor: {
    color: "#3CAA91",
  },
  image: {
    backgroundImage: `url(${img})`,
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
    color: "#3CAA91",
  },
  button: {
    color: "#3CAA91",
  },
}));



export default function Error({ statusCode, message }) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {statusCode}
          </Typography>
          <Grid item>
            <Typography component="h7" variant="h8">
              {message}
            </Typography>
            <div>
              <Link onClick={history.goBack} variant="body2" className={classes.linkColor}>
                {"Go Back"}
              </Link>
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}