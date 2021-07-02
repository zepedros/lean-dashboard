import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import FAB from '../Common/FAB'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import DashboardWidgets from './DashbordWidgets';
import { useHistory } from "react-router-dom";
import Error from '../Common/Errors/Error'
import DashboardWidgetsList from './DashboardWidgetsList'
export default function DashboardPage() {
    const [dashboardWidgets, setDashboardWidgets] = useState([])
    const [errorResponse, setErrorResponse] = useState(undefined)
    const { get, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    useEffect(() => {
        loadDashboards()
    }, [])

    async function loadDashboards() {
        const dashboardResponse = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
        console.log(`is response ok: ${response.ok}`);
        console.log(dashboardResponse);
        if (response.ok) {
            setDashboardWidgets(dashboardResponse.widgets)
        } else {
            setErrorResponse(dashboardResponse)
        }
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
                                <NavBar component={<DashboardWidgetsList widgets={dashboardWidgets} />} />
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={<DashboardWidgets widgets={dashboardWidgets} />} />
                            </Grid>
                        </Hidden>
                    </div>
            }
        </div>

    );
}