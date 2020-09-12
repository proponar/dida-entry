import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { baseUrl } from './config';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const AsyncAutocomplete = props => {
  const {
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
            Authorization: `Token ${window.localStorage.getItem('auth-token')}`
          }
        }
      );
      const entries = await response.data.data;

      if (active) {
        //setOptions(Object.keys(entries).map((key) => entries[key].item[0]));
        //setOptions(entries.map(entry => entry.naz_obec));

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

  const handleValueChange = (ev, value) => {
    console.log('value change: ', value)
    if (value)
      onChange({target: {name: 'lokalizaceObec', value: value.kod_obec}});
  };

  const handleInputChange = (ev, value) => {
    // fixme: populate options
    console.log('val: ', value)
    setSearchStr(value);
    setOptions([]);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.naz_obec === value.naz_obec}
      getOptionLabel={(option) => option.naz_obec}
      options={options}
      loading={loading}
      onChange={handleValueChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Obec"
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

export default AsyncAutocomplete;
