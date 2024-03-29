import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from 'use-http';
import Error from '../components/Common/Errors/Error';
import NavBar from '../components/Common/NavBar';
import WidgetSettings from '../components/Dashboard/WidgetSettings';
import WidgetSettingsList from '../components/Dashboard/WidgetSettingsList';

export default function WidgetSettingsPage() {

    const [dashboard, setDashboard] = useState([])
    const [title, setTitle] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [errorResponse, setErrorResponse] = useState(false)
    const { get, response } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

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
            return dashboardResponse
        } else {
            setErrorResponse(dashboardResponse)
        }
    }

    function doRefresh() {
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
                            <NavBar component={<WidgetSettingsList widgets={dashboard.widgets} name={dashboard.name} refresh={refresh} doRefresh={doRefresh}/>} title={title}/>

                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={<WidgetSettings widgets={dashboard.widgets} name={dashboard.name} refresh={refresh} doRefresh={doRefresh}/>} title={title}/>
                            </Grid>
                        </Hidden>
                    </div>
            }

        </div>
    );
}