import AddWidget from './AddWidget'
import NavBar from '../Common/NavBar'
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import AddWidgetList from './AddWidgetList';
export default function AddWidgetPage() {
    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<AddWidgetList />} title={"{Project Name}"} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<AddWidget />} title={"{Project Name}"} />
                </Grid>
            </Hidden>
        </div>
    );
}