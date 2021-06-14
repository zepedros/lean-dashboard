import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

export default function ProjectsItem({ project }) {

    return (
        <div>
            <Hidden smDown implementation="css">
                <Card variant="outlined">
                    <CardContent>
                        <Typography>
                            {project.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {project.desciption}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton edge="end" aria-label="delete">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Hidden>
            <Hidden mdUp implementation="css">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar variant="square">
                            <AccountTreeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={project.name}
                        secondary={project.desciption !== undefined ? project.desciption : null}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider /> <br />
            </Hidden>
        </div>
    );
}