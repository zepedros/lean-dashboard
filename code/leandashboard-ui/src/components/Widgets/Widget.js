import TemplateWidget from "./TemplateWidget";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from 'use-http'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default function Widget({ widgetId }) {
    const [widget, setWidget] = useState()
    const { get } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    async function getWidget() {
        return await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
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

    useEffect(() => {
        getWidget().then(widget => {
            setWidget(widget)
        })
    }, [widgetId])
    if (widget) {
        return (
            <Grid item md={size(widget.type)}>
                 <Card>
                    <TemplateWidget type={widget.type} />
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