import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import FAB from '../Common/FAB'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import DashboardWidgets from './DashbordWidgets';
import { useHistory } from "react-router-dom";

export default function DashboardPage() {
    const [dashboardWidgets, setDashboardWidgets] = useState([])
    const { get, response } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();
    let history = useHistory();

    useEffect(() => {
        loadDashboards().then((dashboard) => {
            setDashboardWidgets(dashboard.widgets)
            console.log(response.data)
        })
    }, [])

    function redirectTemplateWidgetPage() {
        history.push(`/projects/${id}/dashboards/${dashboardId}/templates`)
    }

    async function loadDashboards() {
        return await get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
    }

    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<FAB addTitle={"Add Widget"} settingsTitle={"Dashboard Settings"} show={true} function={redirectTemplateWidgetPage} />} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<DashboardWidgets widgets={dashboardWidgets} />} />
                </Grid>
            </Hidden>
        </div>
    );
}