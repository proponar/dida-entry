import React, { useState } from 'react';

import FormControl from "@material-ui/core/FormControl";
import CheckboxForm from "./CheckboxForm";
import TextField from "@material-ui/core/TextField";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import useStyles from "./useStyles";

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const checks = ['augm.', 'dem.', 'expr.', 'expr. dem.', 'bižut.', 'bot.',
  'zool.', 'dět.', 'dopr.', 'horn.', 'hrnč.', 'hud.', 'hut.', 'obuv.',
  'kart.', 'kovář.', 'krejč.', 'lak.', 'mlyn.', 'mysl.', 'náb.', 'piv.',
  'ryb.', 'rybn.', 'řem.', 'řezn.', 'sklář.', 'tech.', 'tes.', 'text.',
  'tkalc.', 'truhl.', 'včel.', 'vinař.', 'voj.', 'vor.', 'stav.', 'zahrad.',
  'zedn.', 'zeměd.'];

const textToChecks = text => {
  const checkedValues = (text || '').split(new RegExp(/,\s+/, 'i')).reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    }, {}
  );
  return Object.fromEntries(
    checks.map(c => [c, !!checkedValues[c]])
  );
};

const DialogKvalif = ({open, onClose, checkState, setCheckState}) => (
  <Dialog
    fullWidth={false}
    open={open}
    onClose={onClose}
    aria-labelledby="edite-kvalif-title"
  >
    <DialogTitle id="edite-kvalif-title">Výběr kvalifikátorů</DialogTitle>
    <DialogContent>
      <p id="modal-description">
        Vyberte relevantní kvalifikátory.
      </p>
      <CheckboxForm checks={checks} checkState={checkState} setCheckState={setCheckState} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="outlined">
        Uložit
      </Button>
    </DialogActions>
  </Dialog>
);

const KvalifikatorInput = props => {
  const {
    value = '',
    onChange,
  } = props;

  const [kvModalOpen, setKvModalOpen] = useState(false);

  const [inputValue, setInputValue] = useState(value);
  const [checkState, setCheckState] = useState(textToChecks(value));

  // need this because value changes from outside (parent)
  React.useEffect(() => {
    setInputValue(value);
    setCheckState(textToChecks(value));
  }, [value]);

  const handleKvalifikatorOpen = () => {
    setKvModalOpen(true);
  };

  const handleKvalifikatorClose = () => {
    const newValue = Object.keys(checkState).filter(key => checkState[key]).join(', ');
    setInputValue(newValue);
    setKvModalOpen(false);
    onChange({target: {name: 'kvalifikator', value: newValue}});
  };


  return (
    <FormControl>
      <TextField
        name="kvalifikator"
        variant="outlined"
        margin="normal"
        label="Kvalifikátor"
        value={inputValue}
        onChange={onChange} />
      <button type="button" onClick={handleKvalifikatorOpen}>
        Nastavit
      </button>
      <DialogKvalif
        open={kvModalOpen} onClose={handleKvalifikatorClose}
        checkState={checkState} setCheckState={setCheckState}
      />
    </FormControl>
  );
};

export default KvalifikatorInput;
