import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const vidy = [
  [' ',          '-o-'],
  ['dokonavy',   'dokonavý'],
  ['nedokonavy', 'nedokonavý'],
];

const VidSelect = ({zpusob, onChange}) => {
  const classes = useStyles();
  const [ labelId ] = useState(() => uniqueId('zpusob-label'))

  return (
    <FormControl fullWidth margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Vid</InputLabel>
      <Select
        labelId={labelId}
        value={zpusob || 'm'}
        name="zpusob"
        onChange={onChange}
        label="Vid"
      >
        { vidy.map(r => <MenuItem key={r[0]} value={r[0]}>{r[1]}</MenuItem>) }
      </Select>
    </FormControl>
  );
}
export default VidSelect;
