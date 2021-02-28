import React, { useEffect, useState } from 'react';

import GenericSwitch from './GenericSwitch';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import MeaningSelector from './MeaningSelector';
import RokInput from './RokInput';
import VetneSwitch from './VetneSwitch';
import LokalizaceInput from './LokalizaceInput';
import TvarForm from "./TvarForm";
import ZdrojInput from "./ZdrojInput";
import useStyles from "./useStyles";
import { rodMap, rodRE } from "./RodSelect";

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
      return `${u.tvar}, ${rodMap.get(u.rod)} ${p} ${c}.`
    } else {
      // 'huse, 1 pl.'
      return `${u.tvar}, ${p} ${c}.`
    }
  } catch {
    return u.tvar;
  }
}

const filterTvar = t => (t.replace(/,.*/,''));

const string2urceni = t => {
  // 'obecním, f. 7 sg.'
  //const mtr = t.match(/^([\p{L}\s]+),\s*([fmn])\.\s*(\d)\s+(pl|sg)\.$/u);
  const mtr = t.match(
    new RegExp(`^([\\p{L}\\s]+),\\s*(${rodRE})\\s*(\\d)\\s+(pl|sg)\\.$`, 'u'))
  if (mtr) {
    return {
      tvar: filterTvar(mtr[1]),
      rod: mtr[2].replaceAll(/[. /]/g, ''),
      pad: mtr[3] + ((mtr[4] === 'pl' && 'p') || 's'),
    };
  }

  // 'huse, 1 pl.'
  const mt = t.match(/^([\p{L}\s]+),\s*(\d)\s+(pl|sg)\.$/u);
  if (mt) {
    return {
      tvar: filterTvar(mt[1]),
      rod: ' ',
      pad: mt[2] + ((mt[3] === 'pl' && 'p') || 's'),
    };
  }

  return {
    tvar: filterTvar(t),
    rod: null, // 'm', // blbe
    pad: null  // '1s', // blbe
  };
};

const parseExemplifikaceValue = value => {
  // positive look-behind, then the group, then positive look-ahead
  const matched = (value || '').match(/(?<=\{)[^{}]+(?=\})/g) || [];
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
  const [exempFocused, setExempFocused] = useState(false);

	const exemplifikaceNotNull = (values && values.exemplifikace) || '';

  // handle prop change
  useEffect(() => {
    setValues(data);
    // cannot call parseExemplifikaceValue (would get a React warning)
    // cannot add exemplifikaceNotNull to dependencies (updationg from form to
    // the text field would stop working)
    setTvary(parseExemplifikaceValue((data && data.exemplifikace) || ''));
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

    const newValues = {
      ...values,
      exemplifikace: parts.join(''),
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleTvarValuesChange = (ev, index) => {
    const {name, value} = ev.target;
    if (exempFocused) { // do not apply any changes to exemp if exemp is focused
      return;
    }
    setTvary(tvary.map((t, i) => index === i ? {...t, [name]: value} : t));
    applyChangesToText(index, name, value);
  };

  const handleCastValueChange = ev => {
    const newValues = {
      lokalizace_cast_obce_id: ev.lokalizace_cast_obce_id,
      lokalizace_cast_obce_text: ev.lokalizace_cast_obce_text
    };
    setValues(newValues);
    setData(dataKey, newValues);
    return;
  }

  const handleObecValueChange = ev => {
    const newValues = {
      lokalizace_obec_id: ev.lokalizace_obec_id,
      lokalizace_obec_text: ev.lokalizace_obec_text,
      lokalizace_cast_obce_id: null,
      lokalizace_cast_obce_text: '',
    };
    setValues(newValues);
    setData(dataKey, newValues);
    return;
  };

  const handleValuesChange = ev => {
    const {name, value} = ev.target;

    if ((name === 'exemplifikace') && exempFocused) {
      // apply changes to Tvary only if exemp is focused
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
    console.log('setting from: ', zdroj);

    const newValues = {
      ...values,
      rok: zdroj.rok_sberu || zdroj.rok || values.rok,
      zdroj_id: zdroj.cislo,

      // set location
      lokalizace_obec_id: zdroj.lokalizace_obec,
      lokalizace_obec_text: zdroj.lokalizace_obec_text,
      lokalizace_cast_obce_id: zdroj.lokalizace_cast_obce,
      lokalizace_cast_obce_text: zdroj.lokalizace_cast_obce_text,
    };
    setValues(newValues);
    setData(dataKey, newValues);
  };

  const handleValuesCheckChange = event => {
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
                onFocus={() => setExempFocused(true)}
                onBlur={() => setExempFocused(false)}
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
            onCastChange={handleCastValueChange}
            onObecChange={handleObecValueChange}
            onChange={handleValuesChange}
          />
          <Grid item xs={12}>
            <MeaningSelector
              value={values.meaning_id || -1}
              meanings={values.meanings || []}
              onChange={handleValuesChange}
            />
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
                              tvarList={tvar_map && tvar_map[t.tvar]}
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
