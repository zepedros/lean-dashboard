import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import {  useParams } from "react-router-dom";
import { useState } from 'react';
import AddDialog from '../Common/AddDialog.js'
import AddDashboardDialog from '../Common/AddDashboardDialog'
import WidgetsIcon from '@material-ui/icons/Widgets';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '5%',
    position: 'relative',
    bottom: '45%',
    left: '50%'
},

}));

const state = {
  isActive:false
}

export default function VerticalButton(props) {
  
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false)
  let { id , dashboardId} = useParams();

  function handleOpenDialog() {
    setShowDialog(true)
  }
  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
      className={classes.button}
    >

    {!props.show ? 
      <AddDashboardDialog showDialog={showDialog} setShowDialog={setShowDialog} refreshDashboards={props.refresh} title={props.title} />
      //<AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={props.title} type={props.type}/>
      :null
    }
      {!props.show ? 
      <Tooltip title={props.title1} aria-label="add" placement="left">
        <Button aria-label="add" onClick={handleOpenDialog}> 
          <AddIcon />
        </Button>
      </Tooltip>
     :null
    }
       {props.show ? 
      <Tooltip title={props.title1} aria-label="add" placement="left">
            <Button aria-label="add" > 
              <Link href={`/projects/${id}/dashboards/${dashboardId}/templates`}>
                <AddIcon />
              </Link>
            </Button>
      </Tooltip>
      :null
       }
      

      <Tooltip title={props.title2} aria-label="add" placement="left">
        <Button aria-label="add" >
          <Link href={`/projects/${id}/settings`}>
            <SettingsIcon />
          </Link>
        </Button>
      </Tooltip>
      
      {props.show ? 
      <Tooltip title={props.title3} aria-label="add" placement="left">
        <Button aria-label="add">
          <DeleteIcon />
        </Button>
      </Tooltip>
      :null
      }
      {props.show ? 
      <Tooltip title={props.title4} aria-label="add" placement="left">
        <Button aria-label="add">
          <WidgetsIcon />
        </Button>
      </Tooltip>
      :null
      }
      
      
    </ButtonGroup>
  )
}
