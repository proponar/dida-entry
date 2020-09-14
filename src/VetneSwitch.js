import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const VetneSwitch = props => {
  const {
    value,
    onChange
  } = props;

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Nevětné</Grid>
        <Grid item>
          <Switch
            color="primary"
            checked={value}
            onChange={onChange}
            name="vetne"
          />
        </Grid>
        <Grid item>Větné</Grid>
      </Grid>
    </FormControl>
  );
}
export default VetneSwitch;
