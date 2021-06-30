import NavBar from '../Common/NavBar'
import ProjectSettings from './ProjectSettings'
import Grid from '@material-ui/core/Grid';

export default function ProjectSettingsPage() {
    return (
        <div>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component={<ProjectSettings />} title={"{Project Name}"} />
            </Grid>
        </div>
    )
}