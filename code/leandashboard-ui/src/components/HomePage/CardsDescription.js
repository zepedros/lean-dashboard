import React from "react";

import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const Box = styled('div')(compose(spacing, palette));

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