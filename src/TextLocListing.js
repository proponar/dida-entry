import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

// import CsvUpload from './CsvUpload.js';
// import CsvDownload from './CsvDownload.js';
import TextLocTable from './TextLocTable.js';

const TextLocListing = () => {
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <TextLocTable onStart={e => setLoading(true)} onFinish={e => setLoading(false)}/>
      { loading && <LinearProgress /> }
      <Button onClick={() => localStorage.removeItem('location_texts')} color="primary">
        Obnovit textové lokalizace
      </Button>
    </React.Fragment>
  );
};

export default TextLocListing;
