import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import TopForm from "./TopForm";

const DialogEntry = ({open, onClose, onSave, data}) => {
  const title = (data && data.id && "Editace hesla") || "Nové heslo";

  useEffect(() => { setFormData(data); }, [data]); // handle prop change
  const [formData, setFormData] = useState({});
  const handleSave = () => onSave(formData);

  const handleFormDataChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormDataCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TopForm
          data={formData}
          valuesChange={handleFormDataChange}
          valuesCheckChange={handleFormDataCheckChange}
        />
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

export default DialogEntry;
