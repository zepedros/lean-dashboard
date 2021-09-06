import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from 'use-http';
import NavBar from '../components/Common/NavBar';
import AddWidget from '../components/Widgets/AddWidget';
import AddWidgetList from '../components/Widgets/AddWidgetList';

export default function AddWidgetPage() {
    const [name, setName] = useState()
    const { get, response } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
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