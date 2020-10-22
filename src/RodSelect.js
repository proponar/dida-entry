import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

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
        <MenuItem value=' '>-o-</MenuItem>
        <MenuItem value='m'>m.</MenuItem>
        <MenuItem value='f'>f.</MenuItem>
        <MenuItem value='n'>n.</MenuItem>
      </Select>
    </FormControl>
  );
}
export default RodSelect;
