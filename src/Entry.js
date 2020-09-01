import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import TopForm from './TopForm.js';
import ExempForm from './ExempForm.js';
import { baseUrl } from './config';
import useStyles from "./useStyles";

export default function Entry() {
  const classes = useStyles();
  let { id } = useParams();
  console.log(`Have id: ${id}`);

  const [formData, setFormData] = React.useState({
    entry: {}, // "TopForm" data
    data: {},  // repeated "Exemp" data
  });

  // number of "Exemp" subforms
  const [exempCounter, setExempCounter] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
          baseUrl + `entries/${id}`, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('auth-token')}`
          }
        }
      );
      console.log('loaded entry:', response.data);
      //setEntry(response.data);
    }
    if (id) {
      fetchData();
    } else {
      //setEntry({});
    }
  }, [id]);

  const onSaveClick = () => {
    console.log('saving form', formData);

    axios.post(
      baseUrl + 'entries',
      {
        ...formData.entry,
        exemps: formData.data,
      },
      {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        },
      }
    ).then(response => {
      alert('Heslo uloženo.');
    });
  };

  const setExempData = (key, data) => {
    console.log(`exemp data for ${key}:`, data);
    setFormData({
      entry: formData.entry,
      data: {
        [key]: data,
        ...formData.data,
      },
    })
  };

  const setEntryData = (entryData) => {
    console.log(`entry data:`, entryData);
    setFormData({
      entry: entryData,
      data: formData.data,
    });
  };

  const onAddClick = () => {
    setExempCounter(exempCounter + 1);
  };

  const exempComponents = [];
  for (let i =0; i <= exempCounter; i++) {
    exempComponents.push(<ExempForm setData={setExempData} key={i} dataKey={i} />);
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Grid container item xs={12} spacing={3}>
          <TopForm setData={setEntryData} />
        </Grid>
      </Box>
      <Box className={classes.root}>
        <Grid container item xs={12} spacing={3}>
          {exempComponents}
        </Grid>
      </Box>
      <ButtonGroup className={classes.mainButtons}>
        <Button onClick={() => { onSaveClick(); }} variant="contained" color="primary">Uložit</Button>
        <Button onClick={() => { onAddClick(); }} variant="contained" color="secondary">Přidat</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}
