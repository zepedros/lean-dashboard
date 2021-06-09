import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { positions } from '@material-ui/system';
import { useLocation } from 'react-router';




const useStyles = makeStyles((theme) => ({
  root: {
    
    left: 0,
    bottom: 0,
    width: "100%",
     

  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    postion: "absolute",
    left:0,
    bottom:0,
   
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 800,
    color: "#00000",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "20px",
    marginLeft: "40px",
    justifyContent: 'left'
 },
 toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function StickyFooter() {

  const location = useLocation()
  const pathName=location.pathname
  const classes = useStyles();

  const displayDesktop = () => {
    return (
    <Toolbar className={classes.toolbar}>
        {femmecubatorLogo}
        <div style={{ textAlign:'left'}}>{getMenuButtons()}</div>
    </Toolbar>
    );
  };

  const footerData = [
    {
      label: "About us",
      href: "/about",
    },
    {
      label: "Terms",
      href: "/terms",
    },
    {
      label: "Privacy Policy",
      href: "/privacyPolicy",
    },
    {
      label: "Contact us",
      href: "/contact",
    },

  ];

  const getMenuButtons = () => {
    return footerData.map(({ label, href }) => {
   
      return (
        
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
           // component: RouterLink,
           className:classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
      
    });
};

const femmecubatorLogo = (
  <Typography variant = "h6" component = "h1" className={classes.logo}>
      LeanDashboard
  </Typography>
)
  return (
    <div className={classes.root}>
      <CssBaseline />        
      <footer className={classes.footer} style={{position: pathName === '/' ? 'relative' : 'absolute'}}>
         {displayDesktop()}

      </footer>
    </div>
  );
}
