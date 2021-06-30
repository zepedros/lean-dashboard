import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import DashboardPage from '../Dashboard/DashboardPage';

export default function DashboardsItem({ dashboard }) {
//component={Link} to="/projects"

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

                        <Link href={`dashboards/${dashboard.id}/`} >
                        {dashboard.name}
                        </Link>
                    }

                    secondary={(dashboard.description !== undefined) ? dashboard.description : null}
                />
                                  

            </ListItem>
            <Divider /> <br />
        </div>
    );
}