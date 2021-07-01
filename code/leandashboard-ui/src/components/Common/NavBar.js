import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Hidden } from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: 'white'
    },
    navigation: {
        width: '95%',
        left: '2%',
        height: '12%',
        position: 'fixed',
        bottom: 0
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: "#F0F0F0",
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft(props) {
    const classes = useStyles();
    const [NavigationValue, setNavigationValue] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);

    function handleChange(newValue) {
        setNavigationValue(newValue)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

      const popover=() =>{
          return(
                <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <ListItem button >
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </Popover>
      );
    }
      
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden smDown>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap color="textPrimary">
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <ListItem button component={Link} to="/projects">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                   {popover()}
                </Drawer>
            </Hidden>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.component}
                <Hidden mdUp>
                    <Container>
                        <BottomNavigation value={NavigationValue} onChange={handleChange} className={classes.navigation}>
                            <BottomNavigationAction component={Link} to="/projects" label="Home" value="Home" icon={<HomeIcon />} />
                            <BottomNavigationAction label="Notifications" value="Notifications" icon={<NotificationsIcon />} />
                            <BottomNavigationAction label="Settings" value="Settings" icon={<SettingsIcon />} />
                            <BottomNavigationAction label="Account" value="Account" onClick={handleClick}icon={<AccountCircleIcon />} />
                            {popover()}
                        </BottomNavigation>
                    </Container>
                </Hidden>
            </main>
        </div>
    );
}