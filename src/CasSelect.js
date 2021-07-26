import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const casy = [
  [' ',          '-o-'],
  ['minuly',   'minulý'],
  ['pritomny', 'přítomný'],
  ['budouci',  'budoucí'],
];

const CasSelect = ({zpusob, onChange}) => {
  const classes = useStyles();
  const [ labelId ] = useState(() => uniqueId('zpusob-label'))

  return (
    <FormControl fullWidth margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Čas</InputLabel>
      <Select
        labelId={labelId}
        value={zpusob || 'm'}
        name="zpusob"
        onChange={onChange}
        label="Čas"
      >
        { casy.map(r => <MenuItem key={r[0]} value={r[0]}>{r[1]}</MenuItem>) }
      </Select>
    </FormControl>
  );
}
export default CasSelect;
