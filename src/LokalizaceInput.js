import React, { useEffect } from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

import LokalizaceObec from "./LokalizaceObec";
import LokalizaceCast from "./LokalizaceCast";

const LokalizaceInput = props => {
  const {
    valueObec,
    valueCast,
    onChange
  } = props;

  const [kodObce, setKodObce] = React.useState(
    (valueObec && valueObec.kod_obec) || ''
  );

  useEffect(() => {
    setKodObce((valueObec && valueObec.kod_obec) || '')
  }, [valueObec]);

  const onChangeInternal = (event) => {
    setKodObce(event.target.value);
    onChange(event);
  };

  const onChangeCastInternal = (event) => onChange(event);

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <LokalizaceObec value={valueObec} onChange={onChangeInternal} />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <LokalizaceCast
            value={valueCast}
            onChange={onChangeCastInternal}
            locationId={kodObce}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default LokalizaceInput;
