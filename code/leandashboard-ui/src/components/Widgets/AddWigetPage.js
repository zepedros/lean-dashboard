import AddWidget from './AddWidget'
import NavBar from '../Common/NavBar'
import Grid from '@material-ui/core/Grid';

export default function AddWidgetPage() {

    return (
        <div>
        
          
        <Grid item xs={12} sm={12} md={12}>
             <NavBar component={<AddWidget />} title={"{Project Name}"} />
        </Grid>
           
        </div>
    );
}