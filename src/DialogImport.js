import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import ImportStepper from "./ImportStepper";

const DialogImport = ({open, onClose, entryId}) => {
	const handleSave = () => {};

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={open}
      onClose={onClose}
      aria-labelledby="Import Dialog">
      <DialogTitle id="Import Dialog">Import exemplifikací</DialogTitle>
      <DialogContent>
        <ImportStepper onClose={onClose} entryId={entryId} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogImport;
