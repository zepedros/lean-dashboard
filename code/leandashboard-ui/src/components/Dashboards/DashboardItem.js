import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, green, pink } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
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
  }));

export default function DashboardsItem({ dashboard, user }) {
    const classes = useStyles();

    return (
        <div>
            <ListItem alignItems="flex-start" key={dashboard.id}>
                <ListItemAvatar>
                    <Avatar className={classes.orange} variant="rounded">
                        <DashboardIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                      <Link to={{
                        pathname:`dashboards/${dashboard.id}/`,
                        state: {
                            userIsManager: user
                        }
                      }} style={{ color: 'black' ,textDecoration:"none"}}>
                        {dashboard.name}
                      </Link>
                    }
                    secondary={(dashboard.description !== undefined) ? dashboard.description : null}
                />
            </ListItem>
            <Divider />
        </div>
    );
}