import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import PadSelect from "./PadSelect";
import RodSelect from "./RodSelect";

const TvarForm = ({index, invalid, tvar, rod, pad, tvarList, onChange}) => {
  // value from "{"gynś"=>[{:pad=>"1", :cislo=>"sg"}], "gynš"=>[{:pad=>"1", :cislo=>"sg"}], "hos"=>[{:pad=>"1", :cislo=>"sg"}], ...
  const [ inputId ] = useState(() => uniqueId('tvar-textbox'));

  if (invalid) {
    return (
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <FormControl>
            <TextField
              disabled
              variant="outlined"
              margin="normal"
              label="Tvar"
              id={inputId}
              name='tvar'
              value={tvar}
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid item container xs={12}>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            disabled
            variant="outlined"
            margin="normal"
            label="Tvar"
            id={inputId}
            name='tvar'
            value={tvar}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <RodSelect rod={rod} onChange={ev => onChange(ev, index)} />
      </Grid>
      <Grid item xs={3}>
        <PadSelect pad={pad} tvarList={tvarList} onChange={ev => onChange(ev, index)} />
      </Grid>
    </Grid>
  );
}
export default TvarForm;
