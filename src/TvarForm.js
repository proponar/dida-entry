import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import BootstrapInput from "./BootstrapInput";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import PadSelect from "./PadSelect";
import RodSelect from "./RodSelect";

const TvarForm = props => {
  const values = {
  };

  const [ inputId ] = useState(() => uniqueId('vyznam-textbox'))

  const handleValuesChange = () => {};

  return (
    <Grid item container xs={12}>
      <Grid item xs={6}>
        <FormControl>
          <InputLabel htmlFor={inputId}>Tvar</InputLabel>
          <BootstrapInput
            id={inputId}
            name='tvar'
            value={values.tvar}
            onChange={handleValuesChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <RodSelect rod={values.rod} onChange={handleValuesChange} />
      </Grid>
      <Grid item xs={3}>
        <PadSelect pad={values.pad} onChange={handleValuesChange} />
      </Grid>
    </Grid>
  );
}
export default TvarForm;
