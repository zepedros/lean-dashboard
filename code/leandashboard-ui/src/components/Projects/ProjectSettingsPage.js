import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';
import UserContext from '../../common/UserContext';
import Error from '../Common/Errors/Error';
import NavBar from '../Common/NavBar';
import ProjectSettings from './ProjectSettings';
import ProjectSettingsMobile from './ProjectSettingsMobile';

export default function ProjectSettingsPage() {
    let { id } = useParams();
    const context = useContext(UserContext)
    const [userCanEditProject, setUserCanEditProject] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [project, setProject] = useState()
    const [users, setUsers] = useState([])
    const { get, del, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => {
        getProjectById()
    }, [userCanEditProject, refresh])

    function refreshProject() {
        setRefresh(!refresh)
    }
    async function getProjectById() {
        const getProjectById = await get(`/api/lean/projects/${id}`)
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)

        if (getProjectById?.owner === userInfo.id || userInfo?.id === 1) {
            setProject(getProjectById)
            setUserCanEditProject(true)

            let users = []
            for (let i = 0; i < getProjectById.members.length; i++) {
                console.log(getProjectById.members[i])
                if (getProjectById?.owner !== getProjectById.members[i] || getProjectById.members[i] !== 1) {
                    const user = await get(`/api/lean/users/${getProjectById.members[i]}`)
                    users.push(user)
                }
            }
            setUsers(users)
        } else {
            setProject(undefined)
            setUserCanEditProject(false)
        }
    }

    async function deleteUser(username) {
        const deleteUser = await del(`/api/lean/projects/${id}/users/${username}`)
        if (response.ok) {
            alert('User was deleted from project')
        } else {
            alert(deleteUser.message)
        }
        refreshProject()
    }

    return (
        <div>
            {
                userCanEditProject ?
                    <div>
                        <Hidden mdUp>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={<ProjectSettingsMobile project={project} update={refreshProject} users={users} deleteUser={deleteUser} />} title={project?.name} />
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={<ProjectSettings project={project} update={refreshProject} users={users} deleteUser={deleteUser} />} title={project?.name} />
                            </Grid>
                        </Hidden>
                    </div>
                    :
                    <Error statusCode={403} message={`You can't edit this project`} />
            }
        </div>
    )
}