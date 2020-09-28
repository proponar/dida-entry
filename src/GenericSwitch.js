import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const GenericSwitch = props => {
  const {
    checked = false,
    onChange,
    labelOn = '',
    labelOff = '',
    name
  } = props;

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{labelOff}</Grid>
        <Grid item>
          <Switch
            color="primary"
            checked={checked}
            onChange={onChange}
            name={name}
          />
        </Grid>
        <Grid item>{labelOn}</Grid>
      </Grid>
    </FormControl>
  );
}
export default GenericSwitch;
