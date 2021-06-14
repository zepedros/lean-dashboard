import Typography from '@material-ui/core/Typography';
import ProjectsList from './ProjectsList'
import Container from '@material-ui/core/Container';

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
            <Container maxWidth="sm">
                <Typography component="h1" variant="h5">
                    Lean Dashboard Logo
                </Typography>
                <Typography component="h1" variant="h5">
                    My Projects
                </Typography>
                <ProjectsList projects={testITems} />
            </Container>
        </div>
    );
}