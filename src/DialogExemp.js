import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import ExempForm from "./ExempForm";

const DialogExemp = ({entry, open, onSave, onClose, data}) => {
  const title = (entry && entry.id && "Editace exemplifikace") || "Nová exemplifikace";

  useEffect(() => { setFormData(data); }, [data]); // handle prop change
  const [formData, setFormData] = useState({});
  const handleSetData = (_key, newData) => setFormData({...formData, ...newData});
  const handleSave = () => onSave(formData);

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Přidání/editace exemplifikace k heslu...
        </DialogContentText>
        <ExempForm data={formData} setData={handleSetData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Zrušit
        </Button>
        <Button onClick={handleSave} color="primary" variant="outlined">
          Uložit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExemp;
