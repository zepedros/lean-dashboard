import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Widget from "../Widgets/Widget";
import FAB from '../Common/FAB'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
    filter: {
        position: "relative",
        left: "45%"
    },
}));


export default function DashboardWidgetsList({ widgets }) {
    const classes = useStyles();
    let history = useHistory();
    let { id, dashboardId } = useParams();

    function redirectTemplateWidgetPage() {
        history.push(`/projects/${id}/dashboards/${dashboardId}/templates`)
    }

    return (
        <div>
            {
                widgets ?
                    <Container className={classes.root}>
                        <Grid container allignItems="center" spacing={3} style={{ maxHeight: '85%', overflow: 'scroll' }}>
                            {widgets?.map(widget => {
                                return (
                                    <Widget key={widget} widgetId={widget} />
                                )
                            })}
                        </Grid>
                        <FAB addTitle={"Add Widget"} settingsTitle={"Dashboard Settings"} show={true} function={redirectTemplateWidgetPage} />
                    </Container>
                    :
                    <h1>
                        Error
                    </h1>
            }
        </div>
    )
}