import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      
      float:'left',
      marginTop:'-1%'
    },
  }));

export default function GoBack(){
   const classes = useStyles()
    function back() {
        window.history.back();
    }

    return (
           <IconButton 
                aria-label="delete" 
                className={classes.margin}
                 size="medium"
                 onClick={back}>
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
    );
}