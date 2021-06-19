import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  button: {
    width: '5%',
    position: 'fixed',
    bottom: '2%',
    right: '2%'
},

}));

const state = {
  isActive:false
}

export default function VerticalButton(props) {
  
  const classes = useStyles();
  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
      className={classes.button}
    >
      
      <Tooltip title={props.title1} aria-label="add" placement="left">
        <Button aria-label="add">
          <AddIcon />
        </Button>
      </Tooltip>
     
       
      <Tooltip title={props.title2} aria-label="add" placement="left">
        <Button aria-label="add" >
          <SettingsIcon />
        </Button>
      </Tooltip>
      
      {props.show2 ? 
      <Tooltip title={props.title3} aria-label="add" placement="left">
        <Button aria-label="add">
          <DeleteIcon />
        </Button>
      </Tooltip>
      :null
      }
       {props.show2 ? 
      <Tooltip title={props.title4} aria-label="add" placement="left">
        <Button aria-label="add" >
          <DashboardIcon />
        </Button>
      </Tooltip>
      :null
      }
 
    </ButtonGroup>
  )
}
