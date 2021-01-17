import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import CsvUpload from './CsvUpload.js';
import CsvDownload from './CsvDownload.js';
import SourcesTable from './SourcesTable.js';

const SourcesListing = () => {
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <SourcesTable onStart={e => setLoading(true)} onFinish={e => setLoading(false)}/>
      { loading && <LinearProgress /> }
      <CsvUpload onStart={e => setLoading(true)} onFinish={e => setLoading(false)}/>
      <CsvDownload />
      <Button onClick={localStorage.removeItem('sources')} color="primary">
        Obnovit Zdroje
      </Button>
    </React.Fragment>
  );
};

export default SourcesListing;
