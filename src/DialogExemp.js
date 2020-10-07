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

  React.useEffect(() => { setFormData(data); }, [data]); // handle prop change
  const [formData, setFormData] = React.useState({});
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
          <ExempForm data={formData} setData={handleSetData} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Zrušit
        </Button>
        <Button onClick={handleSave} color="primary">
          Uložit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExemp;
