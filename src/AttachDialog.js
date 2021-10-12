import React from 'react'

import Typography from "@material-ui/core/Typography";

// locally modified version of DropzoneDialog that supports passing of props.children
import DropzDialog from './dropzone/DropzDialog';

import AttachmentChips from "./AttachmentChips";
import HelpPopover from './HelpPopover';

const AttachDialog = ({open, onClose, onSave, data}) => (
  <DropzDialog
    open={open}
    onSave={onSave}
    onClose={onClose}
    dialogTitle={
      <React.Fragment>
        <Typography variant="h6">Připojené soubory
          <HelpPopover help="pripojene_soubory" iconStyle={{float: 'right'}}/>
        </Typography>
      </React.Fragment>
    }
    previewText={'Náhled'}
    cancelButtonText={"Zavřít"}
    submitButtonText={"Uložit"}
    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'image/gif',
                    'audio/mpeg3', 'audio/x-mpeg-3', 'audio/mp3', 'video/*', 'audio/*']}
    showPreviews={true}
    maxFileSize={52428800} // 50MB
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
