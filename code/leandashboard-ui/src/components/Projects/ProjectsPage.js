import ProjectsList from './ProjectsList'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'

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
    }
]
export default function ProjectsPage() {

    return (
        <div>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component = {<ProjectsList projects={testITems}/>}/>
            </Grid>
        </div>
    );
}