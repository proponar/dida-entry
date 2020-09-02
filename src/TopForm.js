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

import BootstrapInput from "./BootstrapInput";
import useStyles from "./useStyles";
import KvalifikatorInput from "./KvalifikatorInput";

const TopForm = props => {
  const classes = useStyles();
  // const [kvModalOpen, setKvModalOpen] = React.useState(false);

	const {
		setData,
	} = props;

  const [values, setValues] = React.useState({
    rod: 'm',
    druh: 'subst',
    heslo: 'kleslo',
    vetne: true,
    kvalifikator: 'kvlf.',
    vyznam: 'vyznam...',
  });

  const handleValuesChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
		setData(newValues);
  };

  const handleValuesCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.checked,
    };
    setValues(newValues);
		setData(newValues);
  };

  return (
    <React.Fragment>
      <Grid item xs={9}>
      </Grid>
      <Grid item xs={3}>
        Autor: xxx
        Verze: xxx
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel htmlFor="heslo">Heslo</InputLabel>
          <BootstrapInput name="heslo" value={values.heslo} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
				<KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <InputLabel htmlFor="vyznam-textbox">Význam</InputLabel>
          <BootstrapInput id="vyznam-textbox" name='vyznam' value={values.vyznam} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Větné</Grid>
            <Grid item>
              <Switch
                color="primary"
                checked={values.vetne}
                onChange={handleValuesCheckChange}
                name="vetne"
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
            name="druh"
            value={values.druh}
            onChange={handleValuesChange}
          >
            <MenuItem value='subst'>Substantiva</MenuItem>
            <MenuItem value='adj'>Adjektiva</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="rod-label">Rod</InputLabel>
          <Select
            labelId="rod-label"
            name="rod"
            value={values.rod}
            onChange={handleValuesChange}
          >
            <MenuItem value='m'>m.</MenuItem>
            <MenuItem value='f'>f.</MenuItem>
            <MenuItem value='n'>n.</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default TopForm;
