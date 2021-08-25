import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, palette, spacing } from '@material-ui/system';
import React from "react";
import { FormattedMessage } from 'react-intl';
import CardDescription from './CardsDescription';
import image1 from '../../images/HomePageImage1.png';
import image2 from '../../images/HomePageImage2.png';


const Box = styled('div')(compose(spacing, palette));
const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "20px",
        paddingRight: "20px"
    },
});

export default function Description() {
    const classes = useStyles();
    return (
        <Box color="white" bgcolor="white" p={1}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                <FormattedMessage  id="HomePage.images.title"/>

            </h1>
            <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item xs={12} sm={12} md={6}>
                    <CardDescription description= {<FormattedMessage  id="HomePage.images.image1"/> } img={image2}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <CardDescription description={<FormattedMessage  id="HomePage.images.image2"/> }  img={image1}/>
                </Grid>
            </Grid>
        </Box>
    )
}