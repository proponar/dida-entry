import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const MeaningSelector = ({value, meanings, onChange}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth margin="normal" variant="outlined" className={classes.formControl}>
      <InputLabel id='vyznam_label'>Význam</InputLabel>
      <Select labelId='vyznam_label' value={value} name="meaning_id" onChange={onChange} label="Význam">
        <MenuItem key={-1} value={-1}>
          Nepřiřazený význam
        </MenuItem>
        { meanings.map(m =>
          <MenuItem key={m.id} value={m.id}>
            {m.cislo + ': ' + m.kvalifikator + ' ' + m.vyznam}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default MeaningSelector;
