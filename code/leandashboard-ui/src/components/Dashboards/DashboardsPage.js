import DashboardsCards from './DashboardsCards'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import DashboardsList from './DashboardsList'
import { Hidden } from '@material-ui/core';

const testITems = [
    {
        pid: 1,
        did: 5,
        name: 'dashboard1',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    },
    {
        pid: 1,
        did: 5,
        name: 'dashboard1',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    }
]

export default function DashboardsPage() {

    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<DashboardsList dashboards={testITems} />} title={"{Project Name}"} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<DashboardsCards dashboards={testITems} />} title={"{Project Name}"} />
                </Grid>
            </Hidden>
        </div>
    );
}