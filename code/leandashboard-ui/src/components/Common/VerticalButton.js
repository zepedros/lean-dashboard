import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  button: {
    width: '5%',
    position: 'fixed',
    bottom: '2%',
    right: '2%'
},

}));


export default function VerticalButton() {
  const classes = useStyles();
  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
      className={classes.button}
    >
      <Tooltip title="Add Dashboard" aria-label="add" placement="left">
        <Button aria-label="add">
          <AddIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Project Settings" aria-label="add" placement="left">
        <Button aria-label="add" >
          <SettingsIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}
