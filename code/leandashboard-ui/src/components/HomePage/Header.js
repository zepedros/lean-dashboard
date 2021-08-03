import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import Language from "../Common/Language";

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
      <div>
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <div >         
            <Language color={true}/>
          </div>
          <div>{getMenuButtons()}</div>
        </Toolbar>
      </div>
    );
  };

  const { header, logo, menuButton, toolbar } = useStyles();

  const getMenuButtons = () => {
   
      return (
        <div>
        <Button variant="outlined" color="primary" maxWidth="sm"
          {...{
            key:  "signIn",
            color: "inherit",
            to: "/signIn",
            component: Link,
            className: menuButton,
          }}
        >
          <FormattedMessage id={`login.signIn`} />
        </Button>
        
        </div>
      );
   
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      LeanDashboard
    </Typography>
  )
  return (
    <header>
      <AppBar className={header}> {displayDesktop()}</AppBar>
    </header>
  );
}