import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import PadSelect from "./PadSelect";
import RodSelect from "./RodSelect";

const TvarForm = props => {
  const {
    index,
    tvar,
    rod,
    pad,
    onChange
  } = props;

  const [ inputId ] = useState(() => uniqueId('tvar-textbox'))

  return (
    <Grid item container xs={12}>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            label="Tvar"
            id={inputId}
            name='tvar'
            value={tvar}
            onChange={ev => onChange(ev, index)} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <RodSelect rod={rod} onChange={ev => onChange(ev, index)} />
      </Grid>
      <Grid item xs={3}>
        <PadSelect pad={pad} onChange={ev => onChange(ev, index)} />
      </Grid>
    </Grid>
  );
}
export default TvarForm;
