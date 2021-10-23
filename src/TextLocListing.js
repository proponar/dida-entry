import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

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
