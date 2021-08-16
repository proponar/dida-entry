import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import HelpIcon from '@material-ui/icons/Help';

import EntryForm from "./EntryForm";

const DialogEntry = ({open, onClose, onSave, data}) => {
  const title = (data && data.id && "Editace hesla") || "Nové heslo";

  useEffect(() => { setFormData(data); }, [data]); // handle prop change
  const [formData, setFormData] = useState({});
  const handleSave = () => onSave(formData);

  const handleFormDataChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormDataCheckChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const formatId = id => (id || 'žádné');

  return (
    <Dialog
      fullScreen={true}
      scroll="body"
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography>
        <Typography variant="h6">{title}
          <HelpIcon style={{float: 'right'}}/>
        </Typography>
        <Typography variant="body1">
          Autor: {data.author_name}, Číslo: {formatId(data.id)}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <EntryForm
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
