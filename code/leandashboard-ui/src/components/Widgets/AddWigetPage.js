import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from 'use-http';
import NavBar from '../Common/NavBar';
import AddWidget from './AddWidget';
import AddWidgetList from './AddWidgetList';

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