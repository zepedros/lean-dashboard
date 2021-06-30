import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import VerticalButton from '../Common/VerticalButton'
import FAB from '../Common/FAB'
import {  useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import useFetch from 'use-http'
import DashboardWidgets from './DashbordWidgets';

export default function DashboardPage() {
    const [dashboardWidgets, setDashboardWidgets] = useState([])
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    useEffect(() => {
        loadDashboards().then(() => {
            console.log(response.data)
        })
    }, [])

    async function loadDashboards() {
         get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
            .then(getDashboard => getDashboard.map(content => {
                setDashboardWidgets(content.widget)}))
        }
        async function loadDashboardsWidgets() {
            get(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
               .then(getDashboard => getDashboard.map(content => {
                   setDashboardWidgets(content.widget)}))
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
                    <NavBar component={<DashboardWidgets />}/>
                </Grid>
            </Hidden>
        </div>
    );
}