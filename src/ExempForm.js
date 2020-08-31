import React from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Box from "@material-ui/core/Box";
import BootstrapInput from "./BootstrapInput";
import RokInput from './RokInput.js';
import RodSelect from './RodSelect.js';
import VetneSwitch from './VetneSwitch.js';
import LokalizaceInput from './LokalizaceInput.js';
import KvalifikatorInput from "./KvalifikatorInput";
import useStyles from "./useStyles";

const ExempForm = props => {
  const classes = useStyles();

  const {
    dataKey,
    setData,
  } = props;

  const [values, setValues] = React.useState({
    rok: '1984',
    kvalifikator: 'kvlf.',
    exemplifikace: 'papapapaaaaa....',
    vyznam: '42...',
    vetne: true,
    location: 'somewhere',
  });

  const handleValuesChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleValuesCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.checked,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  return (
    <React.Fragment>
      <Grid item container xs={12}>
        <Grid item xs={8}>
          <InputLabel htmlFor="exemplifikace-textbox">Exemplifikace</InputLabel>
          <div className={classes.autosizeWrap}>
            <TextareaAutosize
              style={{width: '100%'}}
              width={500}
              rowsMin={3}
              id="exemplifikace-textbox"
              placeholder="..."
              name="exemplifikace"
              value={values.exemplifikace}
              onChange={handleValuesChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
        </Grid>
        <Grid item xs={8}>
          Zdroj
        </Grid>
        <Grid item xs={4}>
          <Button>Novy zdroj</Button>
        </Grid>
        <Grid item xs={12}>
          <LokalizaceInput onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={4}>
          <RokInput value={values.rok} onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={4}>
          <KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="vyznam-textbox">Význam</InputLabel>
            <BootstrapInput
              id="vyznam-textbox"
              name='vyznam'
              value={values.vyznam}
              onChange={handleValuesChange} />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExempForm;
