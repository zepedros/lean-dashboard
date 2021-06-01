import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";

export default function Header() {
  
const useStyles = makeStyles(() => ({
        header: {
           position: "relative",
           backgroundColor: "#000000",
        },
        logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 800,
        color: "#FFFEFE",
        textAlign: "left",
      },
      menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "20px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },

     }));
     
    
  const displayDesktop = () => {
    return (
    <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
    </Toolbar>
    );
  };

  

 const {header,logo,menuButton,toolbar} = useStyles();

 const headersData = [
    {
      label: "Sign up",
      href: "/signUp",
    },
    {
      label: "Sign in",
      href: "/SignIn",
    },
  ];

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button variant="outlined" color="primary"
          {...{
            key: label,
            color: "inherit",
            to: href,
           // component: RouterLink,
           className:menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
};

 const femmecubatorLogo = (
      <Typography variant = "h6" component = "h1" className={logo}>
          LeanDashboard
      </Typography>
  )
  return (
    <header>
      <AppBar className = {header}> {displayDesktop()}</AppBar>
    </header>
  );
}