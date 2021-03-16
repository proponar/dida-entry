import React from 'react';

import CachingAutocomplete from './CachingAutocomplete';
import { baseUrl } from './config';

const ZdrojInput = ({options, value, onChange}) => {
  const source2label = s =>
   ((s.autor && (s.autor + ' ')) || '') +
   ((s.name && (s.name + ' ')) || '') +
   ((s.nazev2 && '(' + s.nazev2 + ') ') || '') +
   (s.rok || '') + '.';

  return (
    <CachingAutocomplete 
      name="zdroj"
      label="Zdroj"
      value={value}
      options={options}
      valueIsSelected={(option, value) => option.naz_obec === value.naz_obec}
      value2label={source2label}
      onChange={onChange}
      cacheKey="sources"
      dataUrl={baseUrl + 'sources'}
    />
  );
};

export default ZdrojInput;
