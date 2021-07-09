import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "bottom",
        width: "auto",
        height: "auto",
        backgroundColor: '',
    },
});
//const colorCards = ['#FFE633', '#339FFF', '#3CAA91', '#7FAA3C']
export default function CredentialsCard({ credential }) {
    const classes = useStyles();
    const credentialInfo = credential.credential
    const buildCredential = () => {
        let result = []
        for (var property in credentialInfo) {
            result.push(
                <div>
                    <Typography gutterBottom variant="h6" component="h7">
                        {property}: {credentialInfo[property]}
                    </Typography>
                </div>
            )
        }
        return result
    }
    return (
        <Grid item key={credential.id} md={6}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5">
                        <VpnKeyIcon fontSize="small" style={{ fill: "black" }} /> {credential.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Source: {credential.source}
                    </Typography>
                    <Divider />
                    {buildCredential()}
                    <Button onClick={console.log('abc')}>
                        <CreateIcon />
                    </Button>
                    <Button onClick={console.log('abc')}>
                        <DeleteIcon />
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}