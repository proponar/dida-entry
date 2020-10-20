import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const PadSelect = props => {
  const classes = useStyles();

  const {
    pad,
    onChange,
  } = props;

  const [ labelId ] = useState(() => uniqueId('pad-label'))

  return (
    <FormControl margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>Pád</InputLabel>
      <Select
        labelId={labelId}
        value={pad}
        name="pad"
        onChange={onChange}
        label="Pád"
      >
        <MenuItem value='1s'>1 sg.</MenuItem>
        <MenuItem value='2s'>2 sg.</MenuItem>
        <MenuItem value='3s'>3 sg.</MenuItem>
        <MenuItem value='4s'>4 sg.</MenuItem>
        <MenuItem value='5s'>5 sg.</MenuItem>
        <MenuItem value='6s'>6 sg.</MenuItem>
        <MenuItem value='7s'>7 sg.</MenuItem>
        <MenuItem value='1p'>1 pl.</MenuItem>
        <MenuItem value='2p'>2 pl.</MenuItem>
        <MenuItem value='3p'>3 pl.</MenuItem>
        <MenuItem value='4p'>4 pl.</MenuItem>
        <MenuItem value='5p'>5 pl.</MenuItem>
        <MenuItem value='6p'>6 pl.</MenuItem>
        <MenuItem value='7p'>7 pl.</MenuItem>
      </Select>
    </FormControl>
  );
}
export default PadSelect;
