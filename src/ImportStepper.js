import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import ExempSimpleTable from "./ExempSimpleTable";
import { baseUrl } from './config';
import useStyles from "./useStyles";

function getSteps() {
  return ['Vožení dat', 'Kontrola', 'Import'];
}

const getStepContent = (step, classes, rows) => {
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
            />
          </div>
          <Typography className={classes.instructions}>Vložte exemplifikace...</Typography>
        </React.Fragment>
      );
    case 1:
      return (
        <React.Fragment>
          <ExempSimpleTable rows={rows} />
          <Typography className={classes.instructions}>Je vše v pořádku?</Typography>
        </React.Fragment>
      );
    case 2:
      return (
         <Typography className={classes.instructions}>Importujeme...</Typography>
      );
    default:
      return 'Unknown step';
  }
}

const ImportStepper = ({entryId}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === 0) { // test import
      axios.post(
        baseUrl + `entries/${entryId}/import`,
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('auth-token')}`,
            "Content-Type": "application/octet-stream; charset=binary",
          }
        }
      ).then(response => {
        console.log(response);
        alert(response.data.message);
        setRows(response.data.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, error => {
        console.log(error);
        console.log(error.response);
        alert(error.response.data.message);
      });
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
            {getStepContent(activeStep, classes, rows)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Zpět
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Importovat' : 'Dál'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportStepper;

