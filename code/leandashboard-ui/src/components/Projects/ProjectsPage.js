import Typography from '@material-ui/core/Typography';
import ProjectsList from './ProjectsList'
import Container from '@material-ui/core/Container';
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
        <NavBar />
    );
}