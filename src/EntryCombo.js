import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { baseUrl } from './config';

const EntryCombo = props => {
  const {
    options: optionsIn,
    value,
    onChange,
  } = props;

  const [options, setOptions] = useState(optionsIn);

  useEffect(() => {
    async function getOptions() {
      const response = await axios.get(
          baseUrl + 'entries', {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('auth-token')}`
          }
        }
      );
      const sources = response.data.data;
      console.log('sources: ', sources);
      setOptions(sources);
    }
    getOptions();
  }, []);

  return (
    <Autocomplete
      name="hesloSel"
      options={options}
      getOptionLabel={(option) => option.heslo}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Heslo" variant="outlined" />}
      onChange={onChange}
    />
  );
};

export default EntryCombo;
