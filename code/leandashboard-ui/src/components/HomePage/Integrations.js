import React from "react";

import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container'


const Box = styled('div')(compose(spacing, palette));

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    avatar: {
        display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'center'
    }
  }));

export default function Integrations(){

    const classes = useStyles();

    return(
        <Box color="white" bgcolor="white" p={1}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                Integrations
            </h1>
            <div className={classes.avatar} >
                <Avatar >J</Avatar>
                <Avatar >A</Avatar>
                <Avatar >S</Avatar>
            </div>

        </Box>
    )
}