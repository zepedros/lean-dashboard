import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';




const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    position: "absolute",
    right: '10%',
    bottom: '12%',
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    color: 'white',

  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
            <Button>
              <ListItemIcon><AddIcon/></ListItemIcon>
              <ListItemText primary={"Add Dashboard"}/>
            </Button>
        </ListItem>
        <ListItem>
            <Button>
              <ListItemIcon><SettingsIcon/></ListItemIcon>
              <ListItemText primary={"Project Settings"}/>
            </Button>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            className={classes.button}
            onClick={toggleDrawer(anchor, true)}>+
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

/*
<Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<AddIcon />}
    >
      Add new
    </Button>
*/