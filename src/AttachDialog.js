import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'

const AttachDialog = ({open, onClose, onSave}) => (
  <DropzoneDialog
    open={open}
    onSave={onSave}
    onClose={onClose}
		dialogTitle={"Připojit soubory"}
  	cancelButtonText={"Zavřít"}
    submitButtonText={"Uložit"}
    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
    showPreviews={false}
    maxFileSize={5000000}
  	dropzoneText={"Přetáhněte soubory sem"}
  	showFileNames={true}
  	getFileAddedMessage={fileName => (`Soubor ${fileName} přidán.`)}
  	getFileRemovedMessage={fileName => (`Soubor ${fileName} odebrán.`)}
  />
);

export default AttachDialog;
