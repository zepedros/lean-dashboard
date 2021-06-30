import TemplateWidget from "../Widgets/TemplateWidget";
import { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import VerticalButton from '../Common/VerticalButton'
import useFetch from 'use-http'
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function DashboardWidgets(props){
    const [widgets, setWidgets] = useState([])
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();
    useEffect(() => {
        getWidgets().then(() => {
            console.log(response.data)
        })
        console.log(widgets)
    }, [props])
   async function getWidgets(){
       {props.widgets.map(
           widgetId => {
            get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
                .then(widget => {
                    console.log(widget)
                    setWidgets([...widgets,widget])
                })
        })
       }
   }
   console.log(widgets)
    return(
        <div>
            <Grid container spacing={5}>
            {widgets.map(widget => {
                return(
                     <TemplateWidget type={widget.type} />
             
                )
            })}
            </Grid>
            <VerticalButton  title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"}title4={"Widgets Settings"} show={true}/>
        </div>
    )
}