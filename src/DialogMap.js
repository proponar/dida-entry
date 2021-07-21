import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { baseUrl } from './config';
import MapView from "./MapView";

const DialogMap = ({entryId, exempId, open, onClose}) => {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (exempId && entryId) {
      axios.get(baseUrl + `entries/${entryId}/exemps/${exempId}/coordinates`, {
        headers: {
          'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
        }
      }).then(response => setMarker(response.data.coordinates));
    }
  }, [exempId, entryId]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={open} onClose={onClose} aria-labelledby="mapa-title">
      <DialogTitle id="mapa-title">Mapa</DialogTitle>
      <DialogContent>
        <MapView marker={marker} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogMap;
