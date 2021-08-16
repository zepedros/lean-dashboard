import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { LOCALES } from '../../i18n';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "20px",
    marginLeft: "2%",
    display: "inline-block"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Language(props) {

  const classes = useStyles();
  const [language, setLanguage] = useState(localStorage.getItem("key"));

  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem("key", event.target.value)
    window.location.reload();
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        onChange={handleChange}
        style={{ color: props.color ? "white" : "black" }}
      >
        <MenuItem value={LOCALES.ENGLISH} style={{ color: "black" }}>English</MenuItem>
        <MenuItem value={LOCALES.PORTUGUESE} style={{ color: "black" }}>Português</MenuItem>
        <MenuItem value={LOCALES.FRENCH} style={{ color: "black" }}>Français</MenuItem>
      </Select>
    </FormControl>
  )
}