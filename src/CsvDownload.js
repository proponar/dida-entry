import React from "react";
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';

import { baseUrl } from './config';

const CsvDownload = props => {
  const handleDownload = () => {
    axios.get(baseUrl + 'sources/download', {
      headers: {
        'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
      }
    }).then(response => {
			saveAs(new Blob([response.data], {type: "text/csv;charset=utf-8"}), 'zdroje.csv');
    });
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleDownload} color="primary" component="span">
          <GetApp />
      </IconButton>
    </React.Fragment>
  );
};

export default CsvDownload;
