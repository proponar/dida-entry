import React, { useEffect, useState } from 'react';

import FormControl from "@material-ui/core/FormControl";
import GenericSwitch from './GenericSwitch.js';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from '@material-ui/core/TextField';

import RokInput from './RokInput.js';
import VetneSwitch from './VetneSwitch.js';
import LokalizaceInput from './LokalizaceInput.js';
import KvalifikatorInput from "./KvalifikatorInput";
import TvarForm from "./TvarForm";
import ZdrojInput from "./ZdrojInput";
import useStyles from "./useStyles";

const addIndex = (h, i) => ({
  index: i,
  key: i,
  ...h
});

const urceni2string = u => {
  try {
    const m = u.pad.match(/^(\d)(\w)/);
    const p = m[1];
    const c = ((m[2] === 's') && 'sg') || 'pl';

    if (u.rod && u.rod !== ' ') {
      // 'obecním, f. 7 sg.'
      return `${u.tvar}, ${u.rod}. ${p} ${c}.`
    } else {
      // 'huse, 1 pl.'
      return `${u.tvar}, ${p} ${c}.`
    }
  } catch {
    return u.tvar;
  }
}

const string2urceni = t => {
  // 'obecním, f. 7 sg.'
  const mtr = t.match(/^(\p{L}+),\s*([fmn])\.\s*(\d)\s+(pl|sg)\.$/u);
  if (mtr) {
    return {
      tvar: mtr[1],
      rod: mtr[2],
      pad: mtr[3] + ((mtr[4] === 'pl' && 'p') || 's'),
    };
  }

  // 'huse, 1 pl.'
  const mt = t.match(/^(\p{L}+),\s*(\d)\s+(pl|sg)\.$/u);
  if (mt) {
    return {
      tvar: mt[1],
      rod: ' ',
      pad: mt[2] + ((mt[3] === 'pl' && 'p') || 's'),
    };
  }

  return {
    tvar: t,
    rod: null, // 'm', // blbe
    pad: null  // '1s', // blbe
  };
};

const parseExemplifikaceValue = value => {
  const matched = (value || '').match(/[^{}]+(?=\})/g) || [];
  return matched.map((t, i) => addIndex(string2urceni(t), i));
};

const ExempForm = ({data, dataKey, setData}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    rod: 'm',
    rok: '',
    kvalifikator: '',
    exemplifikace: '',
    vyznam: '',
    vetne: true,
    aktivni: true,
  });

  const [tvary, setTvary] = useState([]);

	const exemplifikaceNotNull = (values && values.exemplifikace) || '';

  // handle prop change
  useEffect(() => {
    setValues(data);
    setTvary(parseExemplifikaceValue(exemplifikaceNotNull));
  }, [data]);

  // project changes from TvaryForm back to the text of Exemplifikace
  const applyChangesToText = (index, fieldName, fieldValue) => {
    // split keeping the separators as separate items
    const parts = values.exemplifikace.split(/(\{[^{}]+\})/g);

    const changeIndex = 1 + index*2;
    const u = string2urceni(
      parts[changeIndex].replace(/^\{(.*)\}$/, '$1') // remove { }
    );

    // changes to 'pad' and 'rod' are applied
    if ((fieldName === 'pad') || (fieldName === 'rod')) { u[fieldName] = fieldValue; }

    parts[changeIndex] = '{' + urceni2string(u) + '}';

    setValues({
      ...values,
      exemplifikace: parts.join(''),
    });
  };

  const handleTvarValuesChange = (ev, index) => {
    const {name, value} = ev.target;
    setTvary(tvary.map((t, i) => index === i ? {...t, [name]: value} : t));
    applyChangesToText(index, name, value);
  };

  const handleValuesChange = (event) => {
    const {name, value} = event.target;

    console.log(`Setting ${name} to ${value}`);

    if (name === 'exemplifikace') {
      setTvary(parseExemplifikaceValue(value));
    }

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleZdrojChange = zdroj => {
    console.log(zdroj && zdroj.cislo);

    const newValues = {
      ...values,
      rok: zdroj.rok || values.rok, // FIXME: rok_sberu?
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

  const valueObec = (values && values.lokalizace_obec_id && {
    naz_obec: values.lokalizace_obec_text,
    kod_obec: values.lokalizace_obec_id
  }) || undefined;

  const valueCast = (values && values.lokalizace_cast_obce_id && {
    naz_cob: values.lokalizace_cast_obce_text,
    kod_cob: values.lokalizace_cast_obce_id
  }) || undefined;

  const parseTvarMap = tm => {
    try {
      return JSON.parse(values.tvar_map);
    } catch {
      return {};
    }
  }

  const tvar_map = parseTvarMap(values.tvar_map);

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
            <VetneSwitch checked={values.vetne || false} onChange={handleValuesCheckChange} />
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={8}>
              <ZdrojInput options={[]} value={values.zdroj_id} onChange={handleZdrojChange} />
            </Grid>
            <Grid item xs={4}>
              <RokInput value={values.rok} onChange={handleValuesChange} />
            </Grid>
          </Grid>
          <LokalizaceInput
            valueObec={valueObec}
            valueCast={valueCast}
            valueText={values.lokalizace_text}
            onChange={handleValuesChange}
          />
          <Grid item xs={4}>
            <KvalifikatorInput value={values.kvalifikator} onChange={handleValuesChange} />
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField name="vyznam" variant="outlined" margin="normal" label="Význam" value={values.vyznam || ''} onChange={handleValuesChange} />
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
            {tvary.map(t => <TvarForm
                              tvarList={tvar_map['huse']}
                              onChange={handleTvarValuesChange}
                              {...t}
                            />)}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExempForm;
