import React, { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const filterOptions = (options, tvarList) => {
  let tvm = {};
  tvarList.map(
    // {pad: "2", cislo: "sg"}
    tv => ((tv.cislo === 'sg') && `${tv.pad}s`) || `${tv.pad}p`
  ).forEach(e => { tvm[e] = true });

  return options.filter(o => tvm[o[0]]);
};

const options = [
  ['1s', '1 sg.'],
  ['2s', '2 sg.'],
  ['3s', '3 sg.'],
  ['4s', '4 sg.'],
  ['5s', '5 sg.'],
  ['6s', '6 sg.'],
  ['7s', '7 sg.'],
  ['1p', '1 pl.'],
  ['2p', '2 pl.'],
  ['3p', '3 pl.'],
  ['4p', '4 pl.'],
  ['5p', '5 pl.'],
  ['6p', '6 pl.'],
  ['7p', '7 pl.'],
];

const validPadValue = (pad, opts) => {
  if (opts.find(o => o[0] === pad)) {
    return pad;
  } else {
    return opts[0][0];
  }
};

const PadSelect = ({pad, tvarList, onChange}) => {
  const classes = useStyles();
  const [ labelId ] = useState(() => uniqueId('pad-label'))

  const optionsFiltered = (tvarList && filterOptions(options, tvarList)) || options;
  const padFiltered = validPadValue(pad, optionsFiltered);

  useEffect(() => {
    if (padFiltered !== pad) {
      // console.log('old pad: ', pad, " , new pad: ", padFiltered);
      // when chaning the value of Pad, fire the onChage
      onChange({target: {name: 'pad', value: padFiltered}});
    }
  });

  return (
    <FormControl margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Pád</InputLabel>
      <Select labelId={labelId} value={padFiltered} name="pad" onChange={onChange} label="Pád" >
      {optionsFiltered.map(o =>
        <MenuItem key={o[0]} value={o[0]}>{o[1]}</MenuItem>
      )}
      </Select>
    </FormControl>
  );
}
export default PadSelect;
