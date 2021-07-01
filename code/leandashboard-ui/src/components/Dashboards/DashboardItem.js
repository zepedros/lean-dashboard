import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom';

export default function DashboardsItem({ dashboard }) {
    return (
        <div>
            <ListItem alignItems="flex-start" key={dashboard.id}>
                <ListItemAvatar>
                    <Avatar variant="square">
                        <DashboardIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <NavLink to={`dashboards/${dashboard.id}/`} style={{ textDecoration: "none" }} >
                            <Link>
                                {dashboard.name}
                            </Link>
                        </NavLink>
                    }
                    secondary={(dashboard.description !== undefined) ? dashboard.description : null}
                />
            </ListItem>
            <Divider />
        </div>
    );
}