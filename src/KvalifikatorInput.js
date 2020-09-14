import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";

import useStyles from "./useStyles";
import BootstrapInput from "./BootstrapInput";
import CheckboxForm from "./CheckboxForm";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

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
  const checkedValues = text.split(new RegExp(/,\s+/, 'i')).reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    }, {}
  );
  return Object.fromEntries(
    checks.map(c => [c, !!checkedValues[c]])
  );
};

const KvalifikatorInput = props => {
  const {
    value,
    onChange,
  } = props;

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [kvModalOpen, setKvModalOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState(value);
  const [checkState, setCheckState] = React.useState(textToChecks(value));

  // need this because value changes from outside (parent)
  // https://medium.com/@digruby/do-not-use-props-as-default-value-of-react-usestate-directly-818ee192f454
  React.useEffect(() => {
    setInputValue(value);
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

  const modalBody = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h2 id="modal-title">Výběr kvalifikátorů</h2>
      <CheckboxForm checks={checks} checkState={checkState} setCheckState={setCheckState} />
      <p id="modal-description">
        Vyberte relevantní klasifikátory.
      </p>
    </div>
  );

  const [ inputId ] = useState(() => uniqueId('kvalifikator-textbox'))

  return (
    <FormControl>
      <InputLabel htmlFor={inputId}>Kvalifikátor</InputLabel>
      <BootstrapInput id={inputId} name='kvalifikator' value={inputValue} onChange={onChange} />
      <button type="button" onClick={handleKvalifikatorOpen}>
        Nastavit
      </button>
      <Modal open={kvModalOpen} onClose={handleKvalifikatorClose}>
        {modalBody}
      </Modal>
    </FormControl>
  );
};

export default KvalifikatorInput;
