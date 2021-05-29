import React from "react";

import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { CardMedia } from '@material-ui/core';

const Box = styled('div')(compose(spacing, palette));

export default function Integrations(){
    return(
        <Box color="white" bgcolor="white" p={1}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                Integrations
            </h1>
        </Box>
    )
}