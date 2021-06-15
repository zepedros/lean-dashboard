import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
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
        width: '85.5%',
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
        backgroundColor: "theme.palette.background.default",
        padding: theme.spacing(3),
    },
}));

const testITems = [
    {
        pid: 1,
        name: 'abc',
        description: 'description'
    },
    {
        pid: 2,
        name: 'def',
        description: 'description'
    },
    {
        pid: 3,
        name: 'ghi',
        description: 'description'
    }
]

export default function PermanentDrawerLeft({ component }) {
    const classes = useStyles();
    const [NavigationValue, setNavigationValue] = useState("")
    function handleChange(event, newValue) {
        setNavigationValue(newValue)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden smDown>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap color="textPrimary">
                            LeanDashboard
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
                    <ListItem button>
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
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </Drawer>
            </Hidden>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Container maxWidth="sm">
                    {component}
                </Container>
                <Hidden mdUp>
                        <BottomNavigation value={NavigationValue} onChange={handleChange} className={classes.navigation}>
                            <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
                            <BottomNavigationAction label="Notifications" value="Notifications" icon={<NotificationsIcon />} />
                            <BottomNavigationAction label="Settings" value="Settings" icon={<SettingsIcon />} />
                            <BottomNavigationAction label="Account" value="Account" icon={<AccountCircleIcon />} />
                        </BottomNavigation>
                </Hidden>
            </main>
        </div>
    );
}