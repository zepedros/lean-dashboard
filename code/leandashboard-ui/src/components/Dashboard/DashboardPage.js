import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import { Container } from '@material-ui/core';
import VerticalButton from '../Common/VerticalButton'
import BarChart from '../Widgets/BarChart'
import PieChart from '../Widgets/PieChart'
import DataTable from '../Widgets/DataTable'

export default function DashboardPage() {

    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={ <DataTable />}/>
                </Grid>
            </Hidden>
        </div>
    );
}