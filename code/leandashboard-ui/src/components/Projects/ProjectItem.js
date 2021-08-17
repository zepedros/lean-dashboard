import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { blue, deepOrange, deepPurple, green, pink } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useState } from 'react';

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
        blue:{
            color:theme.palette.getContrastText(blue[500]),
            backgroundColor:blue[500],
        },
        
}))

export default function ProjectsItem({ project }) {
    const classes = useStyles()
    const [showMore, setShowMore] = useState(false)
    function handleClick() {
        setShowMore(!showMore)
    }
    
    return (
        <div>
            <ListItem key={project.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="rounded" className={classes.blue}>
                        <AccountTreeIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                       
                            <Link href={`projects/${project.id}/dashboards`} color="inherit">
                                {project.name}
                            </Link>
                       
                    }
                    secondary={(project.description !== undefined) ? project.description : null}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleClick}>
                        <ArrowForwardIosIcon className={classes.dropdown, showMore ? classes.dropdownOpen : classes.dropdownClosed} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={showMore} timeout="auto" unmountOnExit>
                <ListItem>
                    <ListItemText
                        primary="Description"
                        secondary={(project.description !== undefined) ? project.description : null}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Manager"
                        secondary={project.owner}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="State"
                        secondary={project.state}
                    />
                </ListItem>
            </Collapse>
            <Divider />
        </div>
    );
}