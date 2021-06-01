import React from "react";

import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Divider from '@material-ui/core/Divider'



const Box = styled('div')(compose(spacing, palette));

const useStyles = makeStyles({
    image1: {
      postiion:"relative",
      maxWidth: 400,
      marginLeft: 550
    },
  });

export default function Integrations(){

    const classes = useStyles();

    return(
        
            <Box color="white" bgcolor="white" p={1}>
                <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                    Easy and Simple
                </h1>
                <GridList cols={2}>
                <Card className={classes.image1}>
                    <CardMedia
                    className={classes}
                    component="img"
                    //alt="Contemplative Reptile"
                    height="140"
                    image="/components/tests.png"
                    //title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        All the widgets you need
                    </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.image1}>
                    <CardMedia
                    className={classes}
                    component="img"
                    //alt="Contemplative Reptile"
                    height="140"
                    image="/components/tests.png"
                    //title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Create projects to see all you need
                    </Typography>
                    </CardContent>
                </Card>
                </GridList>
            </Box>
         
        
           
        
    )
}