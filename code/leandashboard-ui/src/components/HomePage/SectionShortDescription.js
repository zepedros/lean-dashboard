import { Container } from "@material-ui/core";
import React from "react";
import Divider from '@material-ui/core/Divider'


import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';

const Box = styled('div')(compose(spacing, palette));

export default function SectionShortDescription(){
    return(
       
        <Box color="white" bgcolor="white" p={10}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                Lean Dashboard
            </h1>
            <p className="MuiTypography-root MuiTypography-h6 MuiTypography-colorTextSecondary MuiTypography-paragraph MuiTypography-alignCenter">
                Everything you need to 
            </p>
            <p className="MuiTypography-root MuiTypography-h6 MuiTypography-colorTextSecondary MuiTypography-paragraph MuiTypography-alignCenter">
                know about your project
            </p>            
        </Box>
  
    )
}