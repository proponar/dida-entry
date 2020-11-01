import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { baseUrl } from './config';

const EntryCombo = props => {
  const {
    reload,
    onChange,
  } = props;

  const [options, setOptions] = useState([]);

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
      setOptions(sources);
    }
    getOptions();
  }, [reload]); // reload on signal

  return (
    <Autocomplete
      name="hesloSel"
      options={options}
      getOptionLabel={(option) => option.heslo}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Heslo" variant="filled" margin="dense"/>}
      onChange={onChange}
    />
  );
};

export default EntryCombo;
