import React, { useContext } from 'react';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import ExempSimpleTable from "./ExempSimpleTable";
import MeaningSelector from './MeaningSelector';
import VetneSwitch from './VetneSwitch';

import chipContext from './chipContext';
import { baseUrl } from './config';
import useStyles from "./useStyles";

function getSteps() {
  return ['Vožení dat', 'Vyplnění společných hodnot', 'Kontrola'];
}

const ImportStepper = ({entryId, onClose, meanings}) => {
  const classes = useStyles();
  const chip = useContext(chipContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [text, setText] = React.useState('');
  const [vetne, setVetne] = React.useState(true);
  const [meaning, setMeaning] = React.useState(-1);
  const steps = getSteps();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <div className={classes.autosizeWrap}>
              <TextareaAutosize
                style={{width: '100%'}}
                width={500}
                aria-label="Exemplifikace"
                rowsMin={3} placeholder=""
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            <Typography className={classes.instructions}>Vložte exemplifikace...</Typography>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <MeaningSelector
              value={meaning}
              meanings={meanings || []}
              onChange={e => setMeaning(e.target.value)}
            />
            <VetneSwitch checked={vetne} onChange={e => setVetne(e.target.checked)} />
            <Typography className={classes.instructions}>Vyberte význam</Typography>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <ExempSimpleTable rows={rows} />
            <Typography className={classes.instructions}>Je vše v pořádku?</Typography>
          </React.Fragment>
        );
      case 3:
        return (
           <Typography className={classes.instructions}>Importujeme...</Typography>
        );
      default:
        return 'Unknown step';
    }
  }

  const callImport = dryRun => axios.post(
    baseUrl + `entries/${entryId}/import?dry_run=${dryRun}&vetne=${vetne}&meaning=${meaning}`,
    text,
    {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('auth-token')}`,
        "Content-Type": "application/octet-stream; charset=binary",
      }
    }
  );

  const tryImport = () => {
    callImport(true).then(response => {
      chip.successMsg(response.data.message);
      // display preview
      setRows(response.data.data);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, error => {
      chip.errorMsg(error.response.data.message);
    });
  };

  const runImport = () => {
    callImport(false).then(response => {
      // close the wizard
      onClose();
    }, error => {
      chip.errorMsg(error.response.data.message);
    });
  };

  const handleNext = () => {
    if (activeStep === 1) {
      tryImport();
    } else if (activeStep === 2) {
      runImport();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <DialogActions>
              <Button disabled={activeStep !== 0} onClick={onClose} color="secondary" variant="outlined">
                Zrušit
              </Button>
              <Button disabled={activeStep === 0} onClick={handleBack} color="secondary" variant="outlined">
                Zpět
              </Button>
              <Button onClick={handleNext} color="primary" variant="outlined">
                {activeStep === steps.length - 1 ? 'Importovat' : 'Dál'}
              </Button>
            </DialogActions>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportStepper;

