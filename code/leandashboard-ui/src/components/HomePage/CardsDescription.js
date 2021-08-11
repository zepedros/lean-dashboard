import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from "react";

//const Box = styled('div')(compose(spacing, palette));
const useStyles = makeStyles({
    image1: {
        postiion: "absolute",
        // maxWidth: 400,
        // marginLeft: 550
        minWidth: 225,
    },
    root: {
        minWidth: 200
    },
});

export default function CardsDescription(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes}
                component="img"
                height="140"
                image="/components/tests.png"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}