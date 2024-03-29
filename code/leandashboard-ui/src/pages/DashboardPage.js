import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';
import Error from '../components/Common/Errors/Error';
import NavBar from '../components/Common/NavBar';
import DashboardWidgetsList from '../components/Dashboard/DashboardWidgetsList';
import DashboardWidgets from '../components/Dashboard/DashbordWidgets';
export default function DashboardPage() {
    const [dashboard, setDashboard] = useState([])
    const [title, setTitle] = useState("")
    const [errorResponse, setErrorResponse] = useState(undefined)
    const { get, response } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        loadDashboards()
    }, [refresh])

    async function loadDashboards() {
        const project = await get(`/api/lean/projects/${id}`)
        setTitle(project.name)
        const dashboardResponse = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
        console.log(`is response ok: ${response.ok}`);
        console.log(dashboardResponse);
        if (response.ok) {
            setDashboard(dashboardResponse)
        } else {
            setErrorResponse(dashboardResponse)
        }
    }
    function refreshDashboards() {
        setRefresh(!refresh)
    }

    return (
        <div>
            {
                errorResponse ?
                    <Error statusCode={errorResponse.statusCode} message={errorResponse.message} />
                    :
                    <div>
                        <Hidden mdUp>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar title={title} component={<DashboardWidgetsList name={dashboard.name}  description={dashboard.description} refresh={refreshDashboards} widgets={dashboard.widgets} />} />
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar title={title} component={<DashboardWidgets name={dashboard.name} description={dashboard.description} refresh={refreshDashboards} widgets={dashboard.widgets} />} />
                            </Grid>
                        </Hidden>
                    </div>
            }
        </div>

    );
}