import NavBar from '../Common/NavBar'
import ProjectSettings from './ProjectSettings'
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import UserContext from '../../common/UserContext';
import { useContext, useState, useEffect } from 'react';
import useFetch from 'use-http';
import Error from '../Common/Errors/Error';

export default function ProjectSettingsPage() {
    let { id } = useParams();
    const context = useContext(UserContext)
    const [userCanEditProject, setUserCanEditProject] = useState(false)
    const [project, setProject] = useState()
    const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => {
        getProjectById()
    }, [userCanEditProject])

    async function getProjectById() {
        const getProjectById = await get(`/api/lean/projects/${id}`)
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        const alisa = context
        if (getProjectById.owner === userInfo.id || userInfo.id == 1) {
            setUserCanEditProject(true)
            setProject(getProjectById)
        } else {
            setUserCanEditProject(false)
        }
    }

    return (
        <div>
            {
                userCanEditProject ?
                    <Grid item xs={12} sm={12} md={12}>
                        <NavBar component={<ProjectSettings />} title={project.name} />
                    </Grid>
                    :
                    <Error statusCode={403} message={`You can't edit this project`}/>
            }
        </div>
    )
}