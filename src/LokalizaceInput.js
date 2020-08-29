import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import AsyncAutocomplete from "./AsyncAutocomplete";
//import useStyles from "./useStyles";

const LokalizaceInput = props => {
  //const classes = useStyles();

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
					<AsyncAutocomplete />
				</Grid>
        <Grid item>
          Lokalizace
        </Grid>
        <Grid item>Lokalizace</Grid>
      </Grid>
    </FormControl>
  );
}
export default LokalizaceInput;
