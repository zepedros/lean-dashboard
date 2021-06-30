import TemplateWidget from "./TemplateWidget";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from 'use-http'

export default function Widget({ widgetId }) {
    const [widget, setWidget] = useState()
    const { get } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();

    async function getWidget() {
        return await get(`/api/lean/projects/${id}/dashboard/${dashboardId}/widgets/${widgetId}`)
    }

    useEffect(() => {
        getWidget().then(widget => {
            setWidget(widget)
        })
    }, [widgetId])
    if (widget) {
        return (
            <div>
                <TemplateWidget type={widget.type} />
            </div>
        )
    } else {
        return (
            <div>
                <CircularProgress color="primary" />
            </div>
        )
    }
}