import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

function SuperForm() {
  const [selectedValue, setSelectedValue] = useState("");
  const classes = useStyles();

  return (
    <div>
      <div>
    
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select">Choose Type</InputLabel>
          <Select
            native
            value={selectedValue}
            onChange={event => setSelectedValue(event.target.value)}
            defaultValue=""
            input={<Input id="grouped-native-select" />}
          >
            <option value={1}>Squash</option>
            <option value={2}>Azure</option>
            <option value={3}>Jira</option>
          </Select>
        </FormControl>
        {selectedValue === "1" && (
          <form className={classes.form}>
            <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Username"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Password"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="APIPath"
            margin="dense"
            variant="outlined"
          />
<Button variant="contained" color="primary">
                        Submit
                    </Button>
          </form>
        )}
         {selectedValue === "2" && (
          <form className={classes.form}>
            <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Email"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Token"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Instance"
            margin="dense"
            variant="outlined"
          />
<Button variant="contained" color="primary">
                        Submit
                    </Button>
          </form>
        )}
         {selectedValue === "3" && (
          <form className={classes.form}>
            <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Email"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="Token"
            margin="dense"
            variant="outlined"
          />
           <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="APIPath"
            margin="dense"
            variant="outlined"
          />
          <TextField
            label=""
            id="outlined-margin-dense"
            className={classes.textField}
            placeholder="API Version"
            margin="dense"
            variant="outlined"
          />
<Button variant="contained" color="primary">
                        Submit
                    </Button>
          </form>
        )}
   
   
      </div>
    </div>
  );
}

export default SuperForm;