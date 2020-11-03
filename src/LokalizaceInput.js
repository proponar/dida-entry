import React, { useEffect } from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

import LokalizaceObec from "./LokalizaceObec";
import LokalizaceCast from "./LokalizaceCast";

const LokalizaceInput = props => {
  const {
    valueObec,
    valueCast,
    valueText,
    onChange
  } = props;

  const [kodObce, setKodObce] = React.useState(
    (valueObec && valueObec.kod_obec) || ''
  );

  useEffect(() => {
    setKodObce((valueObec && valueObec.kod_obec) || '')
  }, [valueObec]);

  const handleObecChange = (event) => {
    setKodObce(event.target.value);
    onChange(event);
  };

  const handleCastChange = (event) => onChange(event);

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <LokalizaceObec value={valueObec} onChange={handleObecChange} />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <LokalizaceCast
            value={valueCast}
            onChange={handleCastChange}
            locationId={kodObce}
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <TextField name="lokalizace_text" variant="outlined" label="Lokalizace text" value={valueText} onChange={onChange} />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default LokalizaceInput;
