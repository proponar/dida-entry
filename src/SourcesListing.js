import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import CsvUpload from './CsvUpload.js';
import CsvDownload from './CsvDownload.js';
import SourcesTable from './SourcesTable.js';

const SourcesListing = () => {
  const [loading, setLoading] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(null);

  const uploadFinished = () => {
    setLoading(false);
    localStorage.removeItem('sources');
    setReloadCounter(Math.random());
  }

  return (
    <React.Fragment>
      { loading && <LinearProgress /> }
      <SourcesTable
        reloadCounter={reloadCounter}
        onStart={e => setLoading(true)}
        onFinish={e => setLoading(false)}
      />
      <CsvUpload onStart={e => setLoading(true)} onFinish={e => uploadFinished()}/>
      <CsvDownload />
    </React.Fragment>
  );
};

export default SourcesListing;
