import VerticalButton from '../Common/VerticalButton'
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Widget from "../Widgets/Widget";

export default function DashboardWidgets({ widgets }) {
    console.log(widgets)
    return (
        <div>
            <Container maxWidth="md" >
                <Grid container spacing={5}>
                    {widgets.map(widget => {
                        return (
                            <Card>
                                <Widget key={widget} widgetId={widget} />
                            </Card>
                        )
                    })}
                </Grid>
                <VerticalButton title1={"Add Widget"} title2={"Dashboard Settings"} title3={"Delete Dashboard"} title4={"Widgets Settings"} show={true} />
            </Container>
        </div>
    )
}