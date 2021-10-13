import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImportStepper from "./ImportStepper";
import HelpPopover from './HelpPopover';

const DialogImport = ({open, onClose, entryId, meanings}) => (
  <Dialog
    fullScreen={true}
    scroll="body"
    maxWidth='xl'
    open={open}
    onClose={onClose}
    aria-labelledby="Import Dialog">
    <DialogTitle id="Import Dialog">
      Import exemplifikací
      <HelpPopover help="import_exemplifikaci" iconStyle={{float: 'right'}}/>
    </DialogTitle>
    <DialogContent>
      <ImportStepper onClose={onClose} entryId={entryId} meanings={meanings} />
    </DialogContent>
  </Dialog>
);

export default DialogImport;
