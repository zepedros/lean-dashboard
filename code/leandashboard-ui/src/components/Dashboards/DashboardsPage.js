import DashboardsCards from './DashboardsCards'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import DashboardsList from './DashboardsList'
import { Hidden } from '@material-ui/core';
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const testITems = [
    {
        pid: 1,
        did: 5,
        name: 'dashboard1',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    },
    {
        pid: 1,
        did: 5,
        name: 'dashboard1',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    },
    {
        pid: 2,
        did: 6,
        name: 'dashboard2',
        description: 'description'
    },
    {
        pid: 3,
        did: 7,
        name: 'dashboard3',
        description: 'description'
    },
    {
        pid: 4,
        did: 8,
        name: 'dashboard4',
        description: 'description'
    }
]

export default function DashboardsPage() {

    const [dashboards, setDashboards] = useState([])
    const [project, setProject] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id } = useParams();
    useEffect(() => {
        console.log("refreshing")
        loadDashboards()
    }, [refresh])
    useEffect(() => { loadProjects() }, [setProject])

    async function loadDashboards() {
        const getDashboards = await get(`/api/lean/projects/${id}/dashboards`)
        console.log(getDashboards)
        if (response.ok) setDashboards(getDashboards)
    }

    async function loadProjects() {
        const getProject = await get(`/api/lean/projects/${id}`)
        if (response.ok) setProject(getProject)
        console.log(project)
    }

    function refreshDashboards() {
        setRefresh(!refresh)
    }

    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<DashboardsList dashboards={dashboards} refresh={refreshDashboards} />} title={project.name} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<DashboardsCards dashboards={dashboards} refresh={refreshDashboards} />} title={project.name} />
                </Grid>
            </Hidden>
        </div>
    );
}