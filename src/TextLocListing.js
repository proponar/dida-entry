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
      { loading && <LinearProgress /> }
      <TextLocTable onStart={e => setLoading(true)} onFinish={e => setLoading(false)}/>
    </React.Fragment>
  );
};

export default TextLocListing;
