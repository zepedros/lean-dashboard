import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import VerticalButton from '../Common/VerticalButton'
import FAB from '../Common/FAB'

export default function DashboardPage() {

    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<FAB/>}/>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={ <VerticalButton  title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"}title4={"Widgets Settings"} show={true}/>}/>
                </Grid>
            </Hidden>
        </div>
    );
}