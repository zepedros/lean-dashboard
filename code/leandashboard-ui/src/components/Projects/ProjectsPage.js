import ProjectsList from './ProjectsList'
import ProjectsCards from './ProjectsCards'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';


const testITems = [
    {
        pid: 1,
        name: 'abc',
        description: 'description'
    },
    {
        pid: 2,
        name: 'def',
        description: 'description'
    },
    {
        pid: 3,
        name: 'ghi',
        description: 'description'
    },
    {
        pid: 4,
        name: 'ghi',
        description: 'description'
    }
]
export default function ProjectsPage() {

    return (
        <div>
            <Hidden mdUp>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component = {<ProjectsList projects={testITems}/>} title={"LeanDashboard"}/>
            </Grid>
            </Hidden>
            <Hidden smDown>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component = {<ProjectsCards projects={testITems} />} title={"LeanDashboard"}/>
            </Grid>
            </Hidden>
        </div>
    );
}