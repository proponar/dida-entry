import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const VetneSwitch = ({checked, onChange}) => (
  <FormControl style={{marginTop: '20px', marginLeft: '10px'}}>
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>Nevětné</Grid>
      <Grid item>
        <Switch
          color="primary"
          checked={checked}
          onChange={onChange}
          name="vetne"
        />
      </Grid>
      <Grid item>Větné</Grid>
    </Grid>
  </FormControl>
);

export default VetneSwitch;
