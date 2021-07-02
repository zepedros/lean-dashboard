import VerticalButton from '../Common/VerticalButton'
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Widget from "../Widgets/Widget";
import Box from '@material-ui/core/Grid';
export default function DashboardWidgets({ widgets }) {

    return (
        <div>
            {
                widgets ?
                    <Container maxWidth="sm">
                        <Grid container spacing={3} >
                            {widgets?.map(widget => {
                                return (
                                    <Widget key={widget} widgetId={widget} />
                                )
                            })}
                        </Grid>
                        <VerticalButton title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"} title4={"Widgets Settings"} show={true} />
                    </Container>
                    :
                    <h1>
                        Error
                    </h1>

            }

        </div>
    )
}