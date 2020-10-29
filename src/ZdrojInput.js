import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { baseUrl } from './config';

const ZdrojInput = props => {
  const {
    options: optionsIn,
    value: zdrojIdIn,
    onChange,
  } = props;

  const [options, setOptions] = useState(optionsIn);
  const [selection, setSelection] = useState(null);

  const handleChange = (ev, zdroj) => {
    if (!zdroj) {
      return;
    }

    setSelection(zdroj);
    onChange(zdroj);
  }

  // setOptions and setSelected based on zdrojIdIn
  const setSources = sources => {
    setOptions(sources);
    const selected = sources.find(e => e.cislo == zdrojIdIn);
    if (selected) {
      setSelection(selected);
    }
  };

  // use cached or fetch list of sources
  // https://www.robinwieruch.de/local-storage-react
  useEffect(() => {
    async function getOptions() {
      const cachedSources = localStorage.getItem('sources');
      if (cachedSources) {
        setSources(JSON.parse(cachedSources));
      } else {
        const response = await axios.get(
            baseUrl + 'sources', {
            headers: {
              Authorization: `Token ${window.localStorage.getItem('auth-token')}`
            }
          }
        );
        const sources = response.data.data;
        localStorage.setItem('sources', JSON.stringify(sources));
        setSources(sources);
      }
    }
    getOptions();
  }, [zdrojIdIn]);

  const source2label = source => `${source.autor || '-'}, ${source.name || '-'}, ${source.rok || ''}`;
  // valuegetOptionSelected={(option, value) => option.naz_obec === value.naz_obec}

  // FIXME: zdroj ma mit rok a ted se bude predvyplnovat ze zdroje do exemplifikace
  //        ^^ nebude. Jen, pokud bude prazdny, v zobrazeni (v gridu?) se ukaze
  //        hodnota ze zdroje
	// FIXME: inicialni hodnota!
  return (
    <Autocomplete
      name="zdroj"
      value={selection}
      options={options}
      getOptionSelected={(option, value) => option.naz_obec === value.naz_obec}
      getOptionLabel={source2label}
      style={{ width: 300 }}
      renderInput={(params) => <TextField margin="normal" {...params} label="Zdroj" variant="outlined" />}
      onChange={handleChange}
    />
  );
};

export default ZdrojInput;
