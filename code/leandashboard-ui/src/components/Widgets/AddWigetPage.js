import AddWidget from './AddWidget'
import NavBar from '../Common/NavBar'
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import AddWidgetList from './AddWidgetList';
import { useEffect, useState } from 'react';
import { useFetch } from 'use-http';
import { useParams } from "react-router-dom";

export default function AddWidgetPage() {
    const [name, setName] = useState()
    const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id } = useParams();
    useEffect(()=>{
        loadName()
    },[])
    async function loadName() {
        const project = await get(`/api/lean/projects/${id}`)
        if(response.ok){
            setName(project.name)
        }
    }
    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<AddWidgetList />} title={name} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<AddWidget />} title={name} />
                </Grid>
            </Hidden>
        </div>
    );
}