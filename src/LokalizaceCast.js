import axios from 'axios';
import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { baseUrl } from './config';

const LokalizaceCast = props => {
  const {
    value,
    locationId,
    onChange
  } = props;

  console.log('LokalizaceCast: locationId: ', locationId);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [oldId, setOldId] = React.useState(locationId);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    console.log('useEffect');
    let active = true;

    if (!locationId || (locationId === '') || (locationId === oldId)) {
       return undefined;
    }
    console.log('loading...');

    (async () => {
      const response = await axios.get(
          baseUrl + `locations/${locationId}/parts`, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('auth-token')}`
          }
        }
      );
      const entries = await response.data.data;

      if (active) {
        setOldId(locationId);
        setOptions(entries);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, locationId]);

  const handleValueChange = (ev, value) => {
    console.log('value change: ', value)
    // if (value)
    //   onChange({target: {name: 'lokalizace_obec_id', value: value.kod_obec}});
  };

  const handleInputChange = (ev, value) => {
    //console.log('val: ', value)
    //NOOP
  };

  const [ elementId ] = useState(() => uniqueId('lokalizace-obec'))

  return (
    <Autocomplete
      id={elementId}
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
      getOptionSelected={(option, value) => option.naz_cob === value.naz_cob}
      getOptionLabel={(option) => option.naz_cob}
      options={options}
      loading={loading}
      onChange={handleValueChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={(value && value.naz_obec) || 'Část obce...'}
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

export default LokalizaceCast;