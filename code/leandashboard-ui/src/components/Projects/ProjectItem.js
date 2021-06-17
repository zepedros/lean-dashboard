import { useState } from 'react'
import Button from '@material-ui/core/Button';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';


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
    }
}))

export default function ProjectsItem({ project }) {

    const styles = useStyles()
    const [showMore, setShowMore] = useState(false)

    function handleClick() {
        setShowMore(!showMore)
    }
    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant="square">
                        <AccountTreeIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Button color='primary'>
                            {project.name}
                        </Button>
                    }
                    secondary={(project.description !== undefined) ? project.description : null}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleClick}>
                        <ArrowForwardIosIcon className={[styles.dropdown, showMore ? styles.dropdownOpen : styles.dropdownClosed]} />
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
            <Divider /> <br />
        </div>
    );
}