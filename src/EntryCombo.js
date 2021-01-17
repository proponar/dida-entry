import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { baseUrl } from './config';

const EntryCombo = ({reload, onChange, onReload}) => {
  const [options, setOptions] = useState([]);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    async function getOptions() {
      const response = await axios.get(
          baseUrl + 'entries', {
          headers: {
            Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`
          }
        }
      );
      const entries = response.data.data;
      if (initialLoad) {
        setInitialLoad(false);
      } else {
        // we are reloading
        onReload(entries)
      }
      setOptions(entries);
    }
    getOptions();
    // eslint-disable-next-line
  }, [reload]); // reload on signal

  return (
    <Autocomplete
      name="hesloSel"
      options={options}
      getOptionLabel={(option) => option.heslo}
      getOptionSelected={(option, value) => option.heslo === value.heslo}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Heslo" variant="filled" margin="dense"/>}
      onChange={onChange}
    />
  );
};

export default EntryCombo;
