import React from "react";
//import { withStyles } from "@material-ui/core/styles";
//import { purple } from "@material-ui/core/colors";
//import FormGroup from "@material-ui/core/FormGroup";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
//import InputBase from "@material-ui/core/InputBase";
//import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//import Button from "@material-ui/core/Button";
//import TextareaAutosize from "@material-ui/core/TextareaAutosize";
//import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

import CheckboxForm from "./CheckboxForm";
import BootstrapInput from "./BootstrapInput";
import useStyles from "./useStyles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const TopForm = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [rod, setRod] = React.useState("");
  const [druh, setDruh] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDruhChange = event => {
    setDruh(event.target.value);
  };

  const handleRodChange = event => {
    setRod(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const modalBody = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <CheckboxForm checks={["foo", "bar", "baz", "lorez"]} />
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <React.Fragment>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel htmlFor="heslo-textbox">Heslo</InputLabel>
          <BootstrapInput id="heslo-textbox" />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel htmlFor="kvalofikator-textbox">Kvalifikátor</InputLabel>
          <BootstrapInput id="kvalofikator-textbox" />
          <button type="button" onClick={handleOpen}>
            Nastavit
          </button>
          <Modal open={open} onClose={handleClose}>
            {modalBody}
          </Modal>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel htmlFor="vyznam-textbox">Význam</InputLabel>
          <BootstrapInput id="vyznam-textbox" />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Větné</Grid>
            <Grid item>
              <Switch
                color="primary"
                checked={state.checkedC}
                onChange={handleChange}
                name="checkedC"
              />
            </Grid>
            <Grid item>Nevětné</Grid>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Druh</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={druh}
            onChange={handleDruhChange}
          >
            <MenuItem value={10}>Substantiva</MenuItem>
            <MenuItem value={20}>Adjektiva</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Rod</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rod}
            onChange={handleRodChange}
          >
            <MenuItem value={10}>m.</MenuItem>
            <MenuItem value={20}>f.</MenuItem>
            <MenuItem value={30}>n.</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default TopForm;
