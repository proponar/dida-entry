import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from '@material-ui/core/TextField';

import Box from "@material-ui/core/Box";
import BootstrapInput from "./BootstrapInput";
import RokInput from './RokInput.js';
import VetneSwitch from './VetneSwitch.js';
import LokalizaceInput from './LokalizaceInput.js';
import KvalifikatorInput from "./KvalifikatorInput";
import useStyles from "./useStyles";

const ZdrojInput = props => {
  const {
    options: optionsIn,
    value,
    onChange,
  } = props;

  const [options, setOptions] = useState(optionsIn);

  // https://www.robinwieruch.de/local-storage-react
  // useEffect(() => {
  // const getOptions = () => {
  //   const cachedSources = localStorage.getItem('sources');
  //   if (cachedSources) {
  //     setOptions(sources);
  //   } else {
  //     response = await axios.get(
  //       baseUrl + 'sources',
  //       headers: {
  //         Authorization: `Token ${window.localStorage.getItem('auth-token')}`
  //       }
  //     );
  //     setOptions(response.data);
  //   }
  // }

  // FIXME: zdroj ma mit rok a ted se bude predvyplnovat ze zdroje do exemplifikace
  return (
    <Autocomplete
      name="zdroj"
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Zdroj" variant="outlined" />}
    />
  );
};

const ExempForm = props => {
  const classes = useStyles();

  const {
    data,
    dataKey,
    setData,
  } = props;

  // react on prop change
  React.useEffect(() => {
    setValues(data);
  }, [data]);

  const [values, setValues] = React.useState({
    rok: '1984',
    kvalifikator: 'kvlf.',
    exemplifikace: 'papapapaaaaa....',
    vyznam: '42...',
    vetne: true,
    lokalizaceObec: 'somewhere',
  });

  const handleValuesChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleValuesCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);
    const newValues = {
      ...values,
      [event.target.name]: event.target.checked,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  // FIXME
  const zdroje = ['foo', 'bar', 'baz'];

  const [ inputId ] = useState(() => uniqueId('vyznam-textbox'))

  return (
    <React.Fragment>
      <Grid item container xs={12}>
        <Grid item xs={8}>
          <InputLabel htmlFor="exemplifikace-textbox">Exemplifikace</InputLabel>
          <div className={classes.autosizeWrap}>
            <TextareaAutosize
              style={{width: '100%'}}
              width={500}
              rowsMin={3}
              id="exemplifikace-textbox"
              placeholder="..."
              name="exemplifikace"
              value={values.exemplifikace}
              onChange={handleValuesChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
        </Grid>
        <Grid item xs={8}>
          <ZdrojInput options={zdroje} value={values.zdroj} onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={12}>
          <LokalizaceInput
            valueObec={values.lokalizaceObec}
            valueCast={values.lokalizaceCast}
            onChange={handleValuesChange}
          />
        </Grid>
        <Grid item xs={4}>
          <RokInput value={values.rok} onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={4}>
          <KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor={inputId}>Význam</InputLabel>
            <BootstrapInput
              id={inputId}
              name='vyznam'
              value={values.vyznam}
              onChange={handleValuesChange} />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExempForm;
