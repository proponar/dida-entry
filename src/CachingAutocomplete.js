import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const CachingAutocomplete = props  => {
  const {
    disabled,
    validNullValue, // is null a valid value? will it propagete to onChange?
    textMargin,
    options: optionsIn,
    value: valueIdIn,
    onChange,
    name, // element name
    label, // element label
    value2label,
    valueIsSelected,
    cacheKey, // localStorage key
    dataUrl, // API endpoint
    dense,
  } = props;

  const [options, setOptions] = useState(optionsIn);
  const [selection, setSelection] = useState(null);

  const handleChange = (ev, option, reason) => {
    if (reason === 'clear') {
      if (validNullValue) {
        setSelection(null);
        onChange(option);
      }
      return
    }

    if (!option) {
      return;
    }

    setSelection(option);
    onChange(option);
  }

  // use cached or fetch list of sources
  // https://www.robinwieruch.de/local-storage-react
  useEffect(() => {
    // setOptions and setSelected based on valueIdIn
    const setSources = sources => {
      setOptions(sources);
      const selected = sources.find(e => e.cislo === valueIdIn);
      if (selected) {
        setSelection(selected);
      }
    };

    async function getOptions() {
      const cachedSources = localStorage.getItem(cacheKey);
      if (cachedSources) {
        setSources(JSON.parse(cachedSources));
      } else {
        const response = await axios.get(
          dataUrl, {
            headers: {
              Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`
            }
          }
        );
        const sources = response.data.data;
        localStorage.setItem(cacheKey, JSON.stringify(sources));
        setSources(sources);
      }
    }
    getOptions();
  }, [valueIdIn, cacheKey, dataUrl]);

  // FIXME: zdroj ma mit rok a ted se bude predvyplnovat ze zdroje do exemplifikace
  //        ^^ nebude. Jen, pokud bude prazdny, v zobrazeni (v gridu?) se ukaze
  //        hodnota ze zdroje
	// FIXME: inicialni hodnota!
  //
  return (
    <Autocomplete
      disabled={disabled}
      name={name}
      value={selection}
      options={options}
      getOptionSelected={valueIsSelected}
      getOptionLabel={value2label}
      renderInput={(params) => <TextField
        margin={textMargin} {...params} label={label}
        variant={(dense && "filled") || "outlined"}
        margin={(dense && "dense") || "normal"}
      />}
      onChange={handleChange}
    />
  );
};

export default CachingAutocomplete;
