import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';
import UserContext from '../common/UserContext';
import Error from '../components/Common/Errors/Error';
import NavBar from '../components/Common/NavBar';
import DashboardsCards from '../components/Dashboards/DashboardsCards';
import DashboardsList from '../components/Dashboards/DashboardsList';

export default function DashboardsPage() {

    const [error, setError] = useState(undefined)
    const [dashboards, setDashboards] = useState([])
    const [project, setProject] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)
    const { get, response } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id } = useParams();
    const context = useContext(UserContext)

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
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        if (getProject?.owner === userInfo.id || userInfo?.id === 1) {
            setUserIsManager(true)
        } else {
            setUserIsManager(false)
        }
        console.log(`User is manager: ${userIsManager}`)

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
                            <NavBar component={<DashboardsList dashboards={dashboards} refresh={refreshDashboards} userIsManager={userIsManager} />} title={project.name} />
                        </Grid>
                    </Hidden>
                    <Hidden smDown>
                        <Grid item xs={12} sm={12} md={12}>
                            <NavBar component={<DashboardsCards dashboards={dashboards} refresh={refreshDashboards} userIsManager={userIsManager} />} title={project.name} />
                        </Grid>
                    </Hidden>
                </div>
            }
        </div>
    );
}