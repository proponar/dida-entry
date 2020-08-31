import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import TopForm from './TopForm.js';
import ExempForm from './ExempForm.js';
import { baseUrl } from './config';

export default function Entry() {
  const [exemps, setExemps] = React.useState({
    data: {},
  });

  const [exempComponents, setExempComponents] = React.useState([]);
  const [entry, setEntry] = React.useState({});

  const onSaveClick = () => {
    console.log(entry);
    console.log(exemps.data);
    alert('clicked');
    //{ heslo: 'abraka', kvalifikator: 'dabra', vyznam: 'blah', created_by: '1' }

    axios.post(
      baseUrl + 'entries',
      {
        ...entry,
        exemps: exemps.data,
      },
      {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        },
      }
    ).then(response => {
      alert('saved');
      //setRows(response.data.data);
    });
  };

  const setExempData = (key, data) => {
    console.log(exemps);
    console.log(`exemp data for ${key}:`, data);
    setExemps({
      data: {
        [key]: data,
        ...exemps.data,
      },
    })
  };

  const setEntryData = (data) => {
    console.log(`entry data:`, data);
    setEntry(data);
  };

  const onAddClick = () => {
    const key = exempComponents.length; //Math.random();
    setExempComponents([
      ...exempComponents,
      <ExempForm setData={setExempData} key={key} dataKey={key} />,
    ]);
  };

  return (
    <React.Fragment>
      <Grid container item xs={12} spacing={3}>
        <TopForm setData={setEntryData} />
        {exempComponents.map(c => c)}
      </Grid>
      <Button onClick={() => { onSaveClick(); }} variant="contained" color="primary">Uložit</Button>
      <Button onClick={() => { onAddClick(); }} variant="contained" color="secondary">Přidat</Button>
    </React.Fragment>
  );
}
