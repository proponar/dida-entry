import React from 'react'

// import {DropzoneDialog} from 'material-ui-dropzone'

// locally modified version of DropzoneDialog that supports passing of props.children
import DropzDialog from './dropzone/DropzDialog';

import AttachmentChips from "./AttachmentChips";

const AttachDialog = ({open, onClose, onSave, data}) => (
  <DropzDialog
    open={open}
    onSave={onSave}
    onClose={onClose}
    dialogTitle={"Připojené soubory"}
    previewText={'Náhled'}
    cancelButtonText={"Zavřít"}
    submitButtonText={"Uložit"}
    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
    showPreviews={true}
    maxFileSize={5242880} // 5MB
    dropzoneText={"Přetáhněte soubory sem"}
    showFileNames={true}
    showAlerts={false}
    // getFileAddedMessage={fileName => (`Soubor ${fileName} přidán.`)}
    // getFileRemovedMessage={fileName => (`Soubor ${fileName} odebrán.`)}
  >
    <AttachmentChips entryId={data.entryId} exempId={data.id} chips={data.attachments} />
  </DropzDialog>
);

export default AttachDialog;
