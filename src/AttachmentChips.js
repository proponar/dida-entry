import React from 'react';
import axios from 'axios';

import Chip from '@material-ui/core/Chip';

import { baseUrl } from './config';
import useStyles from "./useStyles"

const AttachmentChips = ({chips, entryId, exempId}) => {
  const classes = useStyles();

  const handleClick = () => {
    console.log('display attachment');
  }

  const handleDelete = (fname, id) => {
    console.log('delete attachment: ', fname, id);
    axios.post( // /api/entries/:entry_id/exemps/:exemp_id/detach
      baseUrl + `entries/${entryId}/exemps/${exempId}/detach`,
      {
        attachment_id: id,
        filename: fname,
      }, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('auth-token')}`,
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
  }

  return (
    <div className={classes.paper} >
      {chips.map(c =>
        <Chip
          // icon={<FaceIcon />}
          key={c.key}
          label={c.filename}
          onClick={handleClick}
          onDelete={e => handleDelete(c.filename, c.id)}
        />)
      }
    </div>
  );
};

export default AttachmentChips;
