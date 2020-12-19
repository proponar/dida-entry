import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const rody = [
  [' ',     '-o-'],
  ['m',     'm.'],
  ['f',     'f.'],
  ['n',     'n.'],
  ['mf',    'm./f.'],
  ['fn',    'f./n.'],
  ['mn',    'm./n.'],
  ['mplt',  'm. plt.'],
  ['fplt',  'f. plt.'],
  ['nplt',  'n. plt.'],
  ['mfplt', 'm./f. plt.'],
  ['fnplt', 'f./n. plt.'],
  ['mnplt', 'm./n. plt.'],
];

export const rodMap = new Map(rody);
export const rodRE = Array.from(rodMap.values())
  .map(v => v.replaceAll('.', '\\.')).join('|')

const RodSelect = props => {
  const classes = useStyles();

  const {
    rod,
    onChange,
  } = props;

  const [ labelId ] = useState(() => uniqueId('rod-label'))

  return (
    <FormControl margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Rod</InputLabel>
      <Select
        labelId={labelId}
        value={rod || 'm'}
        name="rod"
        onChange={onChange}
        label="Rod"
      >
        { rody.map(r => <MenuItem key={r[0]} value={r[0]}>{r[1]}</MenuItem>) }
      </Select>
    </FormControl>
  );
}
export default RodSelect;
