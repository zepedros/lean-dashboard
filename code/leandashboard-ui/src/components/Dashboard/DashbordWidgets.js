import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import GoBack from '../Common/GoBack';
import VerticalButton from '../Common/VerticalButton';
import Widget from "../Widgets/Widget";

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
    return (
        <div>
            <GoBack />
            {
                widgets ?
                    <div>
                        
                        
                        <Typography component="h1" variant="h5" className={classes.dashboardTitle}>
                            {name}
                        </Typography>
                        <Container maxWidth="false" className={classes.container}>
                            <Grid container spacing={3} >
                                {widgets?.map(widget => {
                                    return (
                                        <Widget key={widget} widgetId={widget} />
                                    )
                                })}
                            </Grid>
                        </Container>
                        {user.userIsManager ? 
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