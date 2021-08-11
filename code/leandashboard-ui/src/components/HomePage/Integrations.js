import Avatar from '@material-ui/core/Avatar';
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, palette, spacing } from '@material-ui/system';
import React from "react";
import { FormattedMessage } from 'react-intl';
import azure from '../../images/azure.png';
import jira from '../../images/jira.png';
import squash from '../../images/squash.jpg';

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
        justifyContent: 'center'
    }
}));

export default function Integrations() {
    const classes = useStyles();
    return (
        <Box color="white" bgcolor="white" p={1}>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                <FormattedMessage id="HomePage.integrations" />
            </h1>
            <div className={classes.avatar} >
                <Avatar alt="Jira" src={jira} />
                <Avatar alt="Azure" src={azure} />
                <Avatar alt="Squash" src={squash} />
            </div>
        </Box>
    )
}