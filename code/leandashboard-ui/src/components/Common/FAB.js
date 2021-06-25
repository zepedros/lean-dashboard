import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import AddDialog from '../Common/AddDialog.js'
import { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import WidgetsIcon from '@material-ui/icons/Widgets';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';




const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    position: "fixed",
    right: '5%',
    bottom: '15%',
    background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
    color: 'white',

  },
});

export default function FAB(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false)
  
  const [state, setState] = React.useState({
    bottom: false,
  });
  const {addTitle,settingsTitle} = props
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  function handleOpenDialog() {
    setShowDialog(true)
  }
  const list = (anchor) => (
    
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        <ListItem>
        
        <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={"Add Dashboard"} type={"Dashboard"}/>
        
            <Button onClick={handleOpenDialog}>
              <ListItemIcon ><AddIcon/></ListItemIcon>
              <ListItemText primary={addTitle}/>
            </Button>
        </ListItem>
        <ListItem>
            <Button>
              <ListItemIcon><SettingsIcon/></ListItemIcon>
              <ListItemText primary={settingsTitle}/>
            </Button>
        </ListItem>
        {props.show ?
        <ListItem>
            <Button>
              <ListItemIcon> <DeleteIcon /></ListItemIcon>
              <ListItemText primary={"Delete Dashboard"}/>
            </Button>
        </ListItem>
        :null
        }
        {props.show ?
        <ListItem>
            <Button>
              <ListItemIcon> <WidgetsIcon /></ListItemIcon>
              <ListItemText primary={"Widgets Settings"}/>
            </Button>
        </ListItem>
        :null
        }
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