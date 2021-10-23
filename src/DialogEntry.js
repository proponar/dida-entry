import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';

import EntryForm from "./EntryForm";
import HelpPopover from './HelpPopover';

const ConfirmDialog = ({open, onYes, onNo}) => (
  <Dialog
    open={open}
    onClose={onNo}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Smazat heslo?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Chcete trvale smazat toto heslo i všechny příslušné exemplifikace?
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

const DialogEntry = ({open, onClose, onSave, onDelete, data}) => {
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

  // delete confirmation dialog logic
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const handleDelete = () => {
    setOpenConfirmation(false);
    onDelete(formData);
  };

  return (
    <Dialog
      fullScreen={true}
      scroll="body"
      open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography>
        <Typography variant="h6">{title}
          <HelpPopover help="nove_heslo" iconStyle={{float: 'right'}}/>
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

export default DialogEntry;
