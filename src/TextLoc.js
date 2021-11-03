import React from 'react';

import CachingAutocomplete from './CachingAutocomplete';
import { baseUrl, locationNumbers } from './config';

const TextLoc = ({dense, options, disabled, value, onChange}) => {
  const loc2label = s => (s.cislo && (s.cislo + '. ' + s.identifikator)) || '' ;

  return (
    <CachingAutocomplete
      dense={dense}
      name="lokalizace_text"
      label="Oblast"
      disabled={disabled}
      value={value}
      options={options || []}
      valueIsSelected={(option, value) => option.cislo === value.cislo}
      value2label={(locationNumbers && loc2label) || (s => s.identifikator || '')}
      validNullValue={true}
      onChange={onChange}
      cacheKey="lokalizace_text"
      dataUrl={baseUrl + 'location_texts'}
    />
  );
}

export default TextLoc;
