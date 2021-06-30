import TemplateWidget from "../Widgets/TemplateWidget";
import { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import VerticalButton from '../Common/VerticalButton'
import useFetch from 'use-http'

export default function DashboardWidgets(){

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
        
   //{dashboardWidgets.map(dw =>(<TemplateWidget type={dw}/>))}
    return(
        <div>
            
            <VerticalButton  title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"}title4={"Widgets Settings"} show={true}/>
        </div>
    )
}