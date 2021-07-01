import ProjectsList from './ProjectsList'
import ProjectsTable from './ProjectsTable'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import useFetch from 'use-http'
import { useState, useEffect } from 'react'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [refresh, setRefreshProjects] = useState(false)
    const { get, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })

    useEffect(() => {
        loadProjects().then(() => {
            console.log(response.data)
        })
    }, [refresh])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadProjects() {
        const getProjects = await get('/api/lean/projects')
        if (getProjects) {
            getProjects.map(project => {
                getUsername(project.owner).then(() => {
                    if (response.ok) {
                        project.owner = response.data.username
                    }
                })
            })
            new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                if (response.ok) setProjects(getProjects)
            })
        }
        else setProjects(undefined)
    }

    async function getUsername(owner) {
        return await get(`/api/lean/users/${owner}`)
    }
    
    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<ProjectsList projects={projects} refresh={doRefresh} />} title={"LeanDashboard"} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<ProjectsTable projects={projects} refresh={doRefresh} />} title={"LeanDashboard"} />
                </Grid>
            </Hidden>
        </div>
    );
}