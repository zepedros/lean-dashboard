import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import AddDashboardDialog from '../Common/AddDashboardDialog'
import WidgetsIcon from '@material-ui/icons/Widgets';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import DashboardSettingsDialog from './DashboardSettingsDialog'
import useFetch from 'use-http'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '5%',
    position: 'fixed',
    bottom: '40%',
    right: '2%'
  },
}));

export default function VerticalButton(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false)
  let { id, dashboardId } = useParams();
  var {del,response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
  const history = useHistory()

  function handleOpenDialog() {
    setShowDialog(true)
  }
  async function deleteDashboard(){
     await del(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
    if(response.ok){
      history.push(`/projects/${id}/dashboards`)
    }
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
        : null
      }
      {!props.show ?
        <Tooltip title={props.title1} aria-label="add" placement="left">
          <Button aria-label="add" onClick={handleOpenDialog}>
            <AddIcon />
          </Button>
        </Tooltip>
        : null
      }
      {props.show ?
        <Tooltip title={props.title1} aria-label="add" placement="left">
          <Button aria-label="add" >
            <NavLink to={`/projects/${id}/dashboards/${dashboardId}/templates`}>
              <AddIcon color='primary' />
            </NavLink>
          </Button>
        </Tooltip>
        : null
      }
      {!props.settings ?
      <DashboardSettingsDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      :null
      }
      <Tooltip title={props.title2} aria-label="add" placement="left">
      {props.settings ?
        <Button aria-label="add"  >    
            <NavLink to={`/projects/${id}/settings`}>
              <SettingsIcon color='primary' />
            </NavLink>
        </Button>
        :
        <Button aria-label="add"  onClick={handleOpenDialog}>    
              <SettingsIcon color='primary' />            
        </Button>
  
      }
      </Tooltip>
      {props.show ?
        <Tooltip title={props.title3} aria-label="add" placement="left">
          <Button aria-label="delete" onClick={deleteDashboard}>
            <DeleteIcon />
          </Button>
        </Tooltip>
        : null
      }
      {props.show ?
        <Tooltip title={props.title4} aria-label="add" placement="left">
          <Button aria-label="add">
            <WidgetsIcon />
          </Button>
        </Tooltip>
        : null
      }
    </ButtonGroup>
  )
}
