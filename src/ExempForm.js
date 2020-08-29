import React from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

import RokInput from './RokInput.js';
import RodSelect from './RodSelect.js';
import VetneSwitch from './VetneSwitch.js';
import LokalizaceInput from './LokalizaceInput.js';

const ExempForm = props => {
  const [values, setValues] = React.useState({
  });

  const handleValuesChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleValuesCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <React.Fragment>
      <Grid item container xs={12}>
        <Grid item xs={8}>
          Exemplifikace, nafukovaci
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
          <LokalizaceInput />
        </Grid>
        <Grid item xs={4}>
					<RokInput value={values.rok} onChange={handleValuesChange} />
				</Grid>
        <Grid item xs={4}>Kvalifikátor</Grid>
        <Grid item xs={4}>Význam</Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExempForm;
