import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import VerticalButton from '../Common/VerticalButton'
import FAB from '../Common/FAB'
import {  useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import useFetch from 'use-http'

export default function DashboardPage() {
    const [dashboardWidgets, setDashboardWidgets] = useState('')
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    useEffect(() => {
        loadDashboards().then(() => {
            console.log(response.data)
        })
    }, [])

    async function loadDashboards() {
        const getDashboard = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
        if(getDashboard) {
            setDashboardWidgets(getDashboard.widgets)
            }
        }


    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<FAB addTitle={"Add Widget"} settingsTitle={"Dashboard Settings"} show={true}/>}/>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={ <VerticalButton  title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"}title4={"Widgets Settings"} show={true}/>}/>
                </Grid>
            </Hidden>
        </div>
    );
}