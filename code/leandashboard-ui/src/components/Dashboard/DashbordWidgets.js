import TemplateWidget from "../Widgets/TemplateWidget";
import { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import VerticalButton from '../Common/VerticalButton'
import useFetch from 'use-http'

export default function DashboardWidgets(){

   
   //{dashboardWidgets.map(dw =>(<TemplateWidget type={dw}/>))}
    return(
        <div>
            
            <VerticalButton  title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"}title4={"Widgets Settings"} show={true}/>
        </div>
    )
}