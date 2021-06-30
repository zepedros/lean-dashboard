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