import React from "react";
//import { withStyles } from "@material-ui/core/styles";
//import { purple } from "@material-ui/core/colors";
//import FormGroup from "@material-ui/core/FormGroup";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//import Paper from "@material-ui/core/Paper";

import BootstrapInput from "./BootstrapInput";
import useStyles from "./useStyles";
import KvalifikatorInput from "./KvalifikatorInput";
import RodSelect from "./RodSelect";
import VetneSwitch from "./VetneSwitch";

const TopForm = props => {
  const classes = useStyles();

	const {
    data: values,
    valuesChange: handleValuesChange,
    valuesCheckChange: handleValuesCheckChange,
	} = props;

  const formatId = id => {
    if (id)
      return id;
    else
      return 'žádné';
  };

  return (
    <React.Fragment>
      <Grid item xs={9}>
      </Grid>
      <Grid item xs={3}>
        Autor: {values.author_name},
        Verze: xxx,
        Číslo: {formatId(values.id)}
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
        <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="druh-label">Druh</InputLabel>
          <Select
            labelId="druh-label"
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
        <RodSelect rod={values.rod} onChange={handleValuesChange} />
      </Grid>
    </React.Fragment>
  );
};

export default TopForm;
