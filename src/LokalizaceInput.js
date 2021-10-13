import React, { useEffect } from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

import LokalizaceObec from "./LokalizaceObec";
import LokalizaceCast from "./LokalizaceCast";
import HelpPopover from './HelpPopover';
import TextLoc from "./TextLoc";

const LokalizaceInput = props => {
  const {
    valueObec,
    valueCast,
    valueText,
    onTextChange,
    onObecChange,
    onCastChange
  } = props;

  const [kodObce, setKodObce] = React.useState(
    (valueObec && valueObec.kod_obec) || ''
  );

  useEffect(() => {
    setKodObce((valueObec && valueObec.kod_obec) || '')
  }, [valueObec]);

  const handleObecChange = ev => {
    setKodObce(ev.lokalizace_obec_id);
    onObecChange(ev);
  };

  const handleCastChange = ev => onCastChange(ev);

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <LokalizaceObec value={valueObec} onChange={handleObecChange} />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <LokalizaceCast value={valueCast} onChange={handleCastChange} locationId={kodObce} />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <TextLoc value={valueText} onChange={onTextChange} />
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <HelpPopover help="lokalizace" iconStyle={{marginTop: '15px', float: 'right'}}/>
      </Grid>
    </Grid>
  );
}

export default LokalizaceInput;
