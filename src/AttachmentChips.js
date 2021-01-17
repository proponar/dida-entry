import React, { useContext, useState } from 'react';
import axios from 'axios';

import Chip from '@material-ui/core/Chip';

import { baseUrl } from './config';
import useStyles from './useStyles';
import chipContext from './chipContext';

const AttachmentChips = ({chips, entryId, exempId}) => {
  const classes = useStyles();
  const chip = useContext(chipContext);

  const [theChips, setTheChips] = useState(chips);

  const handleClick = () => {
    console.log('display attachment');
  }

  const handleDelete = (fname, id) => {
    axios.post(
      baseUrl + `entries/${entryId}/exemps/${exempId}/detach`,
      {
        attachment_id: id,
        filename: fname,
      }, {
        headers: {
          Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
          "Content-Type": "application/octet-stream; charset=binary",
        }
      }
    ).then(response => {
      setTheChips(theChips.filter(c => c.id !== id));
      chip.successMsg(response.data.message);
    }, error => {
      console.log(error);
      console.log(error.response);
      chip.errorMsg(error.response.data.message);
    });
  }

  return (
    <div className={classes.chipPaper} >
      {theChips.map(c =>
        <Chip
          color="primary"
          // icon={<FaceIcon />}
          key={c.id}
          label={c.filename}
          onClick={handleClick}
          onDelete={e => handleDelete(c.filename, c.id)}
        />)
      }
    </div>
  );
};

export default AttachmentChips;
