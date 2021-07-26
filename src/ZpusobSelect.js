import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const zpusoby = [
  [' ',           '-o-'],
  ['oznamovaci',  'oznamovací'],
  ['rozkazovaci', 'rozkazovací'],
  ['tazaci',      'tázací'],
];

const ZpusobSelect = ({zpusob, onChange}) => {
  const classes = useStyles();
  const [ labelId ] = useState(() => uniqueId('zpusob-label'))

  return (
    <FormControl fullWidth margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Způsob</InputLabel>
      <Select
        labelId={labelId}
        value={zpusob || 'm'}
        name="zpusob"
        onChange={onChange}
        label="Způsob"
      >
        { zpusoby.map(r => <MenuItem key={r[0]} value={r[0]}>{r[1]}</MenuItem>) }
      </Select>
    </FormControl>
  );
}
export default ZpusobSelect;
