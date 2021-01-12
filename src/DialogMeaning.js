import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import KvalifikatorInput from "./KvalifikatorInput";

const DialogMeaning = ({meaning, open, onSave, onClose, onRemove}) => {
  const [value, setValue] = useState(meaning || {});

  // Ally changes when value changes.
  useEffect(() => { setValue(meaning || {}); }, [meaning]); 

  const handleValuesChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      fullWidth={false}
      maxWidth='xl'
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="Editace významu">Editace významu</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField name="cislo" variant="outlined" margin="normal" label="Číslo" value={value.cislo || ''} onChange={handleValuesChange} />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <KvalifikatorInput value={value.kvalifikator || ''} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField name="vyznam" variant="outlined" margin="normal" label="Význam" value={value.vyznam || ''} onChange={handleValuesChange} />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRemove(value)} color="secondary" variant="outlined">
          Smazat
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Zrušit
        </Button>
        <Button onClick={() => onSave(value)} color="primary" variant="outlined">
          Uložit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogMeaning;
