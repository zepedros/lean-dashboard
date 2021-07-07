import React from "react";
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardDescription from './CardsDescription'
import {FormattedMessage} from 'react-intl';

const Box = styled('div')(compose(spacing, palette));
const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "20px",
        paddingRight: "20px"
    },
});

export default function Integrations() {
    const classes = useStyles();
    return (
        <Box color="white" bgcolor="white" p={1}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                <FormattedMessage  id="HomePage.images.title"/>

            </h1>
            <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item xs={12} sm={12} md={6}>
                    <CardDescription description= {<FormattedMessage  id="HomePage.images.image1"/> }/>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <CardDescription description={<FormattedMessage  id="HomePage.images.image2"/> } />
                </Grid>
            </Grid>
        </Box>
    )
}