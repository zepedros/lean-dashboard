import VerticalButton from '../Common/VerticalButton'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Widget from "../Widgets/Widget";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: '-2.2%',
        width: '94%'
    },
    dashboardTitle: {
        marginTop: '-2%',
        textAlign: 'left',
        marginLeft: '0%',
        color: '#3CAA91'
    }
}));

export default function DashboardWidgets({ name, widgets }) {
    const classes = useStyles();
    return (
        <div>
            {
                widgets ?
                    <div>
                        <Typography component="h1" variant="h3" className={classes.dashboardTitle}>
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
                        <VerticalButton title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"} title4={"Widgets Settings"} show={true} />
                    </div>
                    :
                    <h1>
                        Error
                    </h1>

            }

        </div>
    )
}