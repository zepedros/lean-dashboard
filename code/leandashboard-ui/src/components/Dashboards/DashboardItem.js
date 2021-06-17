import { useState } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'

export default function DashboardsItem({ dashboard }) {

    function handleClick() {

    }

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="square">
                        <DashboardIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                    <Button color='primary'>
                        {dashboard.name}
                    </Button>
                    }
                    secondary={(dashboard.description !== undefined) ? dashboard.description : null}
                />
            </ListItem>
            <Divider /> <br />
        </div>
    );
}