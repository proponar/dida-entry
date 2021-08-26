import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import useStyles from "./useStyles";
import RodSelect from "./RodSelect";
import ZpusobSelect from "./ZpusobSelect";
import CasSelect from "./CasSelect";
import VidSelect from "./VidSelect";
import SRodSelect from "./SRodSelect";
import VetneSwitch from "./VetneSwitch";
import MeaningTable from "./MeaningTable";

const EntryForm = props => {
  const classes = useStyles();

  const {
    data: values,
    valuesChange: handleValuesChange,
    valuesCheckChange: handleValuesCheckChange,
  } = props;

  const sortMeanings = m =>
    (m && m.sort((a, b) => a.cislo - b.cislo)) || [];

  return (
    <Grid container item xs={12}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <TextField required name="heslo" variant="outlined" margin="normal" label="Heslo" value={values.heslo} onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" margin="normal" className={classes.formControl}>
          <InputLabel id="druh-label">Druh</InputLabel>
          <Select
            labelId="druh-label"
            name="druh"
            value={values.druh}
            onChange={handleValuesChange}
            label="Druh"
          >
            <MenuItem value='subst'>Substantiva</MenuItem>
            <MenuItem value='adj'>Adjektiva</MenuItem>
            <MenuItem value='sloveso'>Slovesa</MenuItem>
            <MenuItem value='zajmeno'>Zájména</MenuItem>
            <MenuItem value='cislovka'>Číslovky</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <RodSelect rod={values.rod} onChange={handleValuesChange} />
      </Grid>
      { values.druh === 'sloveso' && (
        <React.Fragment>
          <Grid item xs={3}>
            <CasSelect rod={values.cas} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={3}>
            <ZpusobSelect rod={values.zapusob} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={3}>
            <SRodSelect rod={values.srod} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={3}>
            <VidSelect rod={values.vid} onChange={handleValuesChange} />
          </Grid>
        </React.Fragment>
      )}
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
      <Grid item xs={12} style={{marginBottom: '30px'}} className={classes.meaningCell} >
        <MeaningTable meanings={sortMeanings(values.meanings)} onChange={handleValuesChange} />
      </Grid>
    </Grid>
  );
};

export default EntryForm;
