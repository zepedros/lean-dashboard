import { useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { green, pink, purple, orange, blue } from '@material-ui/core/colors';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    dropdown: {
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        })
    },
    dropdownOpen: {
        transform: "rotate(90deg)"
    },
    dropdownClosed: {
        transform: "rotate(0)"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },

}))

export default function CredentialsItem({ credential }) {
    const styles = useStyles()
    const [showMore, setShowMore] = useState(false)
    const credentialInfo = credential.credential
    function handleClick() {
        setShowMore(!showMore)
    }
    const colors = [styles.orange, styles.purple, styles.pink, styles.green, styles.blue]
    const itemColor = () => {
        return (colors[Math.floor(Math.random() * colors.length)])
    }
    const buildCredential = () => {
        let result = []
        for (var property in credentialInfo) {
            result.push(
                <ListItem>
                    <ListItemText
                        primary={property}
                        secondary={credentialInfo[property]}
                    />
                </ListItem>
            )
        }
        return result
    }
    return (
        <div>
            <ListItem key={credential.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded" className={itemColor()}>
                        <VpnKeyIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={credential.name}
                    secondary={credential.source}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleClick}>
                        <ArrowForwardIosIcon className={[styles.dropdown, showMore ? styles.dropdownOpen : styles.dropdownClosed]} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={showMore} timeout="auto" unmountOnExit>
                {buildCredential()}
                <Button onClick={console.log('abc')}>
                    <CreateIcon />
                </Button>
                <Button onClick={console.log('abc')}>
                    <DeleteIcon />
                </Button>
            </Collapse>
            <Divider />
        </div>
    );
}