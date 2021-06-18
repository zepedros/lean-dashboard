import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    button: {
      display: "flex",
      justifyContent: "flex-end"
    },
    
  }));


export default function VerticalButton() {
    const classes = useStyles();
    return(
      <Container className={classes.button}>
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
        
     </Container>  
)
}
