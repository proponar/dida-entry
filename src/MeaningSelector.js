import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const meaning2label = m =>
  m.kvalifikator ? (m.cislo + ': ' + m.kvalifikator + ' ' + m.vyznam) : (m.cislo + ': ' + m.vyznam);

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
            {meaning2label(m)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default MeaningSelector;
