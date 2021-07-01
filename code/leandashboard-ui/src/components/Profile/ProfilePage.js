import { Typography } from "@material-ui/core"
import NavBar from '../Common/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

export default function ProfilePage(){
    const classes = useStyles();
    const page = () => {
        return(
            <div>
                
                <Typography variant="h6" noWrap color="textPrimary">Profile</Typography>
                <Box display="flex" p={1} justifyContent="center" bgcolor="background.paper">
                <FormControl className={classes.margin}>
                <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                <Input
                 id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                     <AccountCircle />
                    </InputAdornment>
                }
                />
                </FormControl>
                </Box>
                <Box display="flex" p={1} bgcolor="background.paper">
                    <Box flexGrow={1}  justifyContent="center" bgcolor="background.paper" >
                        <TextField
                        label="Number of Projects"
                        id="outlined-size-small"
                        defaultValue="4"
                        variant="outlined"
                        size="small"
                        disabled
                        />
                    </Box>
                    <Box p={1} bgcolor="background.paper" >
                        <Button color="primary">Change Password</Button>
                    </Box>
                </Box>

            </div>
        ) 
    }

    return(
        <div>
            <NavBar component={page()}/>
        </div>
    )
}