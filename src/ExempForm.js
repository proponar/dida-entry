import React, { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId'
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from "@material-ui/core/FormControl";
import GenericSwitch from './GenericSwitch.js';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from '@material-ui/core/TextField';

import BootstrapInput from "./BootstrapInput";
import RokInput from './RokInput.js';
import VetneSwitch from './VetneSwitch.js';
import LokalizaceInput from './LokalizaceInput.js';
import KvalifikatorInput from "./KvalifikatorInput";
import RodSelect from "./RodSelect";
import TvarForm from "./TvarForm";
import ZdrojInput from "./ZdrojInput";
import { baseUrl } from './config';
import useStyles from "./useStyles";

const parseExemplifikaceValue = value => {
  const matched = (value || '').match(/[^{}]+(?=\})/g) || [];
  console.log('tvary: ', matched);

  return matched.map((t, i) => {
    // 'huse, 1 pl.'
    // const mt = t.match(/^(\w+),\s*(\d)\s+(pl|sg)\.$/);
    const mt = t.match(/^(\p{L}+),\s*(\d)\s+(pl|sg)\.$/u);
    if (mt) {
      return {
        index: i,
        key: i,
        tvar: mt[1],
        rod: 'm', // FIXME: chceme ho?
        pad: mt[2] + ((mt[3] == 'pl' && 'p') || 's'),
      };
    } else {
      return {
        index: i,
        key: i,
        tvar: t,
        rod: 'm',
        pad: '1s',
      }
    };
  });
};

const ExempForm = props => {
  const classes = useStyles();

  const {
    data,
    dataKey,
    setData,
  } = props;

	const exemplifikaceNotNull = (data && data.exemplifikace) || '';

  // handle prop change
  React.useEffect(() => {
    setValues(data);
    setTvary(parseExemplifikaceValue(exemplifikaceNotNull));
  }, [data]);

  const [values, setValues] = React.useState({
    rod: 'm',
    rok: '',
    kvalifikator: '',
    exemplifikace: '',
    vyznam: '',
    vetne: true,
    //lokalizaceObec: 'somewhere',
    aktivni: true,
  });

  //const [tvary, setTvary] = React.useState(parseExemplifikaceValue(values.exemplifikace));
  const [tvary, setTvary] = React.useState([]);

  const handleTvarValuesChange = (ev, index) => {
    const {name, value} = ev.target;
    setTvary(tvary.map((t, i) => index === i ? {...t, [name]: value} : t));
  };

  const handleValuesChange = (event) => {
    const {name, value} = event.target;

    console.log(`Setting ${name} to ${value}`);

    if (name === 'exemplifikace') {
      setTvary(parseExemplifikaceValue(value));
    }

    if (name === 'zdroj') {
      console.log('zmena zdroje --> predvyplnit');
    }

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleZdrojChange = zdroj => {
    console.log('handleZdrojChange: ', zdroj);
    console.log(zdroj && zdroj.cislo);

    const newValues = {
      ...values,
      zdroj_id: zdroj.cislo,
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

  const [ inputId ] = useState(() => uniqueId('vyznam-textbox'))

  const valueObec = (values && values.lokalizace_obec_id && {
    naz_obec: values.lokalizace_obec_text,
    kod_obec: values.lokalizace_obec_id
  }) || undefined;

  return (
    <React.Fragment>
      <Grid item container xs={12}>
        <Grid item container xs={8}>
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
                value={exemplifikaceNotNull}
                onChange={handleValuesChange}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <VetneSwitch checked={values.vetne} onChange={handleValuesCheckChange} />
          </Grid>
          <Grid item xs={8}>
            <ZdrojInput options={[]} value={values.zdroj_id} onChange={handleZdrojChange} />
          </Grid>
          <Grid item xs={4}>
            <RokInput value={values.rok} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={12}>
            <LokalizaceInput
              valueObec={valueObec}
              valueCast={values.lokalizaceCast}
              onChange={handleValuesChange}
            />
          </Grid>
          <Grid item xs={4}>
            <RodSelect rod={values.rod} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={4}>
            <KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <TextField name="vyznam" variant="outlined" margin="normal" label="Význam" value={values.vyznam} onChange={handleValuesChange} />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <GenericSwitch
              name='aktivni'
              labelOn='Aktivní'
              labelOff='Neaktivní'
              checked={values.aktivni}
              onChange={handleValuesCheckChange}
            />
          </Grid>
        </Grid>
        <Grid item container xs={4}>
          <Grid item xs={12}>
            {tvary.map(t => <TvarForm onChange={handleTvarValuesChange} {...t} />)
            }
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExempForm;
