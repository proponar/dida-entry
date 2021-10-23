import React, { useContext } from "react";
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Publish from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';

import { baseUrl } from './config';
import useStyles from "./useStyles";
import chipContext from './chipContext';

const CsvUpload = ({onStart, onFinish}) => {
  const classes = useStyles();
  const chip = useContext(chipContext);

  const handleUpload = ({target}) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(target.files[0]);
    fileReader.onload = (e) => {
      onStart && onStart();

      axios.post(
        baseUrl + `sources/upload`,
        e.target.result, {
          headers: {
            Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
            "Content-Type": "application/octet-stream; charset=binary",
          }
        }
      ).then(response => {
        onFinish && onFinish();
        chip.successMsg(response.data.message);
      }, error => {
        onFinish && onFinish();
        console.log(error);
        chip.errorMsg(error.response.data.message);
      });
    };
  };

  return (
    <React.Fragment>
      <input
          accept="text/csv"
          className={classes.hiddenInput}
          id="icon-button-photo"
          onChange={handleUpload}
          type="file"
      />
      <label htmlFor="icon-button-photo">
        <Tooltip title="Import zdrojů (CSV)">
          <IconButton color="primary" component="span">
              <Publish />
          </IconButton>
        </Tooltip>
      </label>
    </React.Fragment>
  );
};

export default CsvUpload;
