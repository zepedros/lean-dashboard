import DashboardsCards from './DashboardsCards'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import DashboardsList from './DashboardsList'
import { Hidden } from '@material-ui/core';
import { useHistory } from 'react-router';
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Error from '../Common/Errors/Error'

export default function DashboardsPage() {

    const history = useHistory()
    const [error, setError] = useState(undefined)
    const [dashboards, setDashboards] = useState([])
    const [project, setProject] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { get, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id } = useParams();
    useEffect(() => {
        console.log("refreshing")
        loadDashboards()
    }, [refresh])
    useEffect(() => { loadProjects() }, [setProject])

    async function loadDashboards() {
        const getDashboards = await get(`/api/lean/projects/${id}/dashboards`)
        if (response.ok) {
            setDashboards(getDashboards)
        } else {
            setError(getDashboards)
        }
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
            {error ?
                <Error statusCode={error.statusCode} message={error.message}/>
                :
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
            }
        </div>
    );
}