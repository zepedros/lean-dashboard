import TemplateWidget from "./TemplateWidget";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from 'use-http'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Error from '../Common/Errors/Error'

export default function Widget({ widgetId }) {
    const [widget, setWidget] = useState()
    const [errorResponse, setErrorResponse] = useState()
    const { get, post, response, loading, error } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    useEffect(() => {
        getWidget()

    }, [widgetId])
    
    async function getWidget() {
        const widgetResponse = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
        if (response.ok) {
            console.log(widgetId);
            setWidget(widgetResponse)
        } else {
            setErrorResponse(widgetResponse)
        }
    }
    const size = (type) => {
        console.log(type)
        switch (type) {
            case "BarChart": return '6'
            case "PieChart": return '6'
            case "DataTable": return '12'
            case "GaugeChart": return '4'
            default: return <div></div>
        }
    }

    

    if (errorResponse) {
        return <Error statusCode={error.statusCode} message={error.message} />
    }

    if (widget) {
        return (
            <Grid item md={size(widget.type)}>
               
                    <Card>
                    <TemplateWidget type={widget.type} widget={widget} />
                    </Card>
              
               
            </Grid>
        )
    } else {
        return (
            <div>
                <CircularProgress color="primary" />
            </div>
        )
    }
}