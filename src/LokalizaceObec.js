import axios from 'axios';
import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { baseUrl } from './config';

const LokalizaceObec = props => {
  const {
    disabled,
    value,
    onChange
  } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [searchStr, setSearchStr] = React.useState('');

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(
          baseUrl + 'locations/search/' + searchStr, {
          headers: {
            Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`
          }
        }
      );
      const entries = await response.data.data;

      if (active) {
				// FIXME: mamte tu limit :-(
        setOptions(entries.slice(0, 100));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, searchStr]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  const handleValueChange = (ev, value) => (value &&
    onChange({
      lokalizace_obec_id: value.kod_obec,
      lokalizace_obec_text: value.naz_obec,
    })
  );

  const handleInputChange = (ev, value) => {
    if (value === '') {
      // remove value
      onChange({
        lokalizace_obec_id: null,
        lokalizace_obec_text: '',
      })
    }
    setSearchStr(value);
    setOptions([]);
  };

  const [ elementId ] = useState(() => uniqueId('lokalizace-obec'))

  return (
    <Autocomplete
      disabled={disabled}
      id={elementId}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      getOptionSelected={(option, value) => option.naz_obec === value.naz_obec}
      getOptionLabel={(option) => `${option.naz_obec} ${option.zk_okres}`}
      options={options}
      loading={loading}
      onChange={handleValueChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={(value && value.naz_obec) || 'Obec...'}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default LokalizaceObec;
