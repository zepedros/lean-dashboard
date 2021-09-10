import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';
import Error from '../Common/Errors/Error';
import TemplateWidget from "./TemplateWidget";

export default function WidgetSettingsWidget({ widgetId }) {
    const [widget, setWidget] = useState()
    const [errorResponse, setErrorResponse] = useState()
    const { get, response, error } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    async function getWidget() {
        const widgetResponse = await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
        if (response.ok) {
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

    useEffect(() => {
        getWidget()
    }, [widgetId])

    if (errorResponse) {
        return <Error statusCode={error.statusCode} message={error.message} />
    }

    if (widget) {
        return (
            <Card>
                <TemplateWidget type={widget.type} widget={widget} />
            </Card>
        )
    } else {
        return (
            <div>
                <CircularProgress color="primary" />
            </div>
        )
    }
}