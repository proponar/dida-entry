import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

// import { withStyles } from "@material-ui/core/styles";

const CheckboxForm = props => {
  const {
    checks,
    checkState,
    setCheckState,
  } = props;

  const handleChange = event => {
    setCheckState({ ...checkState, [event.target.name.substr(3)]: event.target.checked });
  };

  return (
    <div>
      <Grid container>
        {checks.map(c => (
          <Grid key={c} item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkState[c]}
                  onChange={handleChange}
                  name={"cb_" + c}
                  color="primary"
                />
              }
              label={c}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CheckboxForm;
