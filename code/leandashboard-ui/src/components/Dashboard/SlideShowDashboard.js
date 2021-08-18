import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {useLocation} from 'react-router-dom'
import Widget from "../Widgets/Widget";
import { useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    
    dashboardTitle: {
        marginTop: '0',
        textAlign: 'left',
        marginLeft: '0%',
        color: '#3CAA91'
    }
}));

export default function SlideShowDashbord(){
    const classes = useStyles();
    const [autoplay, setAutoplay] = useState(true)
    const location = useLocation()
    const  dashboard  = location
    console.log(dashboard.state.dashboard)
      
    return (
        <div>
          <Slide autoplay={autoplay} >
             {dashboard.state.dashboard?.map(widget => {
                                    return (
                                        <Widget key={widget} widgetId={widget} />
                                    )
                                })}
          </Slide>
         
        </div>
        
       
      )
}

