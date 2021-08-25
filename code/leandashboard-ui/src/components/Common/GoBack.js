import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      
      float:'left',
      marginTop:'-1%'
    },
  }));

export default function GoBack({link}){
   const classes = useStyles()
   let history = useHistory();
   
    function back() {
      console.log(link)
      if(link)
        history.push(link)
      else
        window.history.back();
    }

    return (
           <IconButton 
                aria-label="delete" 
                className={classes.margin}
                 size="medium"
                 onClick={back}
                 //component={Link}
                // to="/projects"
                >
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
    );
}