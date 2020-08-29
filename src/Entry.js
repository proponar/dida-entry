import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import TopForm from './TopForm.js';
import ExempForm from './ExempForm.js';
import { baseUrl } from './config';

export default function Entry() {
  const [exemps, setExemps] = React.useState([]);

  const onSaveClick = () => {
    alert('clicked');
		axios.post(baseUrl + 'entries', {
			headers: {
				'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
			}
      //{ heslo: 'abraka', kvalifikator: 'dabra', vyznam: 'blah', created_by: '1' }
		}).then(response => {
      alert('saved');
      //setRows(response.data.data);
    });
  };

  const onAddClick = () => {
    setExemps([...exemps, <ExempForm/>]);
  };

  const setTopData = data => {
    console.log('top data: ', data);
  };

  return (
    <React.Fragment>
      <Grid container item xs={12} spacing={3}>
        <TopForm setData={setTopData} />
        {exemps.map(e =>
          <ExempForm/>
        )}
      </Grid>
      <Button onClick={() => { onSaveClick(); }} variant="contained" color="primary">Uložit</Button>
      <Button onClick={() => { onAddClick(); }} variant="contained" color="secondary">Přidat</Button>
    </React.Fragment>
  );
}
