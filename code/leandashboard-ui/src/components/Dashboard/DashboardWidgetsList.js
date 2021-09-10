import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import {useLocation} from 'react-router-dom'
import { useHistory, useParams } from "react-router-dom";
import { useState} from 'react'
import FAB from '../Common/FAB';
import GoBack from "../Common/GoBack";
import Widget from "../Widgets/Widget";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '8%',
        height: '79%',
        width: '90%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        position: "fixed",
        right: '5%',
        bottom: '15%',
        background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
        color: 'white',
    },
    dashboardTitle: {
        marginTop: '0',
        textAlign: 'left',
        marginLeft: '0%',
        color: '#3CAA91'
    },
}));


export default function DashboardWidgetsList({ name, widgets,description,refresh }) {
    const classes = useStyles();
    let history = useHistory();
    const location = useLocation()
    const  userIsManager  = location
    const [user, setUserIsManager] = useState(userIsManager.state)
    
    let { id, dashboardId } = useParams();

    function redirectTemplateWidgetPage() {
        history.push(`/projects/${id}/dashboards/${dashboardId}/templates`)
    }

    return (
        <div>
            
            {
                widgets ?
                    <Container className={classes.root}>
                        <GoBack link={`/projects/${id}/dashboards`}/>
                        <Typography component="h1" variant="h5" className={classes.dashboardTitle}>
                            {name}
                        </Typography>
                        <Grid container alignItems="center" spacing={3} style={{ maxHeight: '85%', overflow: 'scroll' }}>
                            {widgets?.map(widget => {
                                return (
                                    <Widget key={widget} widgetId={widget} />
                                )
                            })}
                        </Grid>
                        { user.userIsManager ? 
                        <FAB 
                            addTitle={<FormattedMessage id="Dashboard.VerticalButton.firstButton"/>} 
                            settingsTitle={<FormattedMessage id="Dashboard.VerticalButton.secondButton"/>}
                            show={true} 
                            function={redirectTemplateWidgetPage} 
                            nameDashboard={name}
                            descriptionDashboard={description}
                            refresh={refresh}
                            />
                            :
                            null
                        }
                    </Container>
                    :
                    <h1>
                        Error
                    </h1>
            }
        </div>
    )
}