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
import TextField from "@material-ui/core/TextField";
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
    <Grid container xs={12}>
      <Grid item xs={2}>
        Autor: {values.author_name},
        Verze: xxx,
        Číslo: {formatId(values.id)}
      </Grid>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <TextField required name="heslo" variant="outlined" margin="normal" label="Heslo" value={values.heslo} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField name="tvary" variant="outlined" margin="normal" fullWidth label="Tvary" value={values.tvary} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField name="urceni" variant="outlined" margin="normal" fullWidth label="Určení" value={values.urceni} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField name="vyznam" variant="outlined" margin="normal" label="Význam" value={values.vyznam} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" margin="normal" className={classes.formControl}>
          <InputLabel id="druh-label">Druh</InputLabel>
          <Select
            margin="normal"
            labelId="druh-label"
            name="druh"
            value={values.druh}
            onChange={handleValuesChange}
            label="Druh"
          >
            <MenuItem value='subst'>Substantiva</MenuItem>
            <MenuItem value='adj'>Adjektiva</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <RodSelect rod={values.rod} onChange={handleValuesChange} />
      </Grid>
    </Grid>
  );
};

export default TopForm;
