import React from "react";
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Publish from '@material-ui/icons/Publish';

import { baseUrl } from './config';
import useStyles from "./useStyles";

const CsvUpload = props => {
  const classes = useStyles();

  const handleUpload = ({target}) => {
    // console.log('handleUpload');
    const fileReader = new FileReader();
    // const name = target.accept.includes('image') ? 'images' : 'videos';

    // fileReader.readAsDataURL(target.files[0]);
    fileReader.readAsArrayBuffer(target.files[0]);
    fileReader.onload = (e) => {
      //this.setState((prevState) => ({
      //    [name]: [...prevState[name], e.target.result]
      //}));
      console.log(e.target.result);
      axios.post(
        baseUrl + `sources/upload`,
        e.target.result, {
          headers: {
            Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
            "Content-Type": "application/octet-stream; charset=binary",
          }
        }
      ).then(response => {
        console.log(response);
        alert(response.data.message);
      }, error => {
        console.log(error);
        console.log(error.response);
        alert(error.response.data.message);
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
          <IconButton color="primary" component="span">
              <Publish />
          </IconButton>
      </label>
    </React.Fragment>
  );
};

export default CsvUpload;
