import VerticalButton from '../Common/VerticalButton'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Widget from "../Widgets/Widget";
import { makeStyles } from '@material-ui/core/styles';
import {  Typography } from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import GoBack from '../Common/GoBack';
import {useLocation} from 'react-router-dom'
import { useState} from 'react'
import Button from '@material-ui/core/Button';
import SlideShowDashbord from '../Dashboard/SlideShowDashboard'
import { useHistory,useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: '-2.2%',
        width: '94%'
    },
    dashboardTitle: {
        marginTop: '0',
        textAlign: 'left',
        marginLeft: '0%',
        color: '#3CAA91'
    }
}));

export default function DashboardWidgets({ name, widgets,description,refresh }) {
    const classes = useStyles();
    const location = useLocation()
    const  userIsManager  = location
    const [user, setUserIsManager] = useState(userIsManager.state)
    let { id,dashboardId } = useParams();

    return (
        <div>
            <GoBack link={`/projects/${id}/dashboards`}/>
            
            {
                widgets ?
                    <div>
                        
                        <div>
                        <Typography component="h1" variant="h5" className={classes.dashboardTitle}>
                            {name}
                        </Typography>
                        <Link to={{
                                pathname:`/projects/${id}/dashboards/${dashboardId}/slideShow/`,
                                state:{
                                    dashboard:widgets,
                                    name:name
                                }}}>
                            <Button variant="contained" color="primary" >
                                Apresentation mode
                            </Button>
                        </Link>
                        </div>
                        <Container maxWidth={false} className={classes.container}>
                            <Grid container spacing={3} >
                                {widgets?.map(widget => {
                                    return (
                                        <Widget key={widget} widgetId={widget} />
                                    )
                                })}
                            </Grid>
                        </Container>
                        { user.userIsManager ? 
                        <VerticalButton 
                        title1={<FormattedMessage id="Dashboard.VerticalButton.firstButton"/>} 
                        title2={<FormattedMessage id="Dashboard.VerticalButton.secondButton"/>} 
                        title3={<FormattedMessage id="Dashboard.VerticalButton.thirdButton"/>}
                        title4={<FormattedMessage id="Dashboard.VerticalButton.fourthButton"/>} 
                        show={true} 
                        nameDashboard={name}
                        descriptionDashboard={description}
                        refresh={refresh}/>
                        :
                        null}
                        
                    </div>
                    :
                    <h1>
                        Error
                    </h1>

            }

        </div>
    )
}