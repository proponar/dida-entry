import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

//import useStyles from "./useStyles";

const VetneSwitch = props => {
  //const classes = useStyles();
  
  const {
    value,
    onChange
  } = props;

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Větné</Grid>
        <Grid item>
          <Switch
            color="primary"
            checked={value}
            onChange={onChange}
            name="vetne"
          />
        </Grid>
        <Grid item>Nevětné</Grid>
      </Grid>
    </FormControl>
  );
}
export default VetneSwitch;
