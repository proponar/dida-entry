import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';

import ExempForm from "./ExempForm";

const ConfirmDialog = ({open, onYes, onNo}) => (
  <Dialog
    open={open}
    onClose={onNo}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Smazat exemplifikaci?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Chcete trvale smazat tuto exemplifikaci?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onYes} color="primary" variant="outlined">
        Ano
      </Button>
      <Button onClick={onNo} color="primary" variant="outlined" autoFocus>
        Ne
      </Button>
    </DialogActions>
  </Dialog>
);

const DialogExemp = ({open, onSave, onClose, onDelete, data}) => {
  const title = (data.entryId && "Editace exemplifikace") || "Nová exemplifikace";

  useEffect(() => { setFormData(data); }, [data]); // handle prop change
  const [formData, setFormData] = useState({});
  const handleSetData = (_key, newData) => setFormData({...formData, ...newData});
  const handleSave = () => onSave(formData);

  // delete confirmation dialog logic
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const handleDelete = () => {
    setOpenConfirmation(false);
    onDelete(formData);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}
        <HelpIcon style={{float: 'right'}}/>
      </DialogTitle>
      <DialogContent>
        <ExempForm data={formData} setData={handleSetData} />
      </DialogContent>
      <DialogActions>
        <Button startIcon={<DeleteIcon />} onClick={() => setOpenConfirmation(true)} color="secondary" variant="outlined">
          Smazat
        </Button>
        <ConfirmDialog open={openConfirmation} onNo={() => setOpenConfirmation(false)} onYes={handleDelete} />
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
