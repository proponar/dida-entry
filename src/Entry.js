import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
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
	const history = useHistory();
  let { id } = useParams();

  if (id) {
    console.log(`Have id: ${id}`);
  } else {
    console.log('No id.');
  }

  const [formData, setFormData] = React.useState({
    entry: {
      id: null,
      rod: 'm',
      druh: 'subst',
      heslo: 'kleslo',
      vetne: true,
      kvalifikator: 'ex. kvlf.',
      vyznam: 'vyznam...',
    },
    exemps: {},  // repeated "Exemp" data
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
      console.log('entry part:', response.data.entry);
      console.log('exemps part:', response.data.exemps);

      const nExemps = response.data.exemps.length;
      console.log('nExemps: ', nExemps);

      const exempData = {};
      for (let i = 0; i < nExemps; i++) {
        exempData[i] = response.data.exemps[i];
      }

      setFormData({
        entry: response.data.entry,
        exemps: exempData,
      });

      setExempCounter(response.data.exemps.length);
    }
    if (id) {
      fetchData();
    } else {
      //setEntry({});
    }
  }, [id]);

  const saveNew = () => {
    console.log('Ukládám nové heslo', formData);

    axios.post(
      baseUrl + 'entries',
      {
        entry: formData.entry,
        exemps: formData.exemps,
      },
      {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        },
      }
    ).then(response => {
      console.log(response.data);
      const entryId = response.data.data.id;
      console.log(entryId);
      history.push(`/entry/${entryId}`);
    }, error => {
      console.log(error);
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const saveExisting = () => {
    console.log(`Aktualizuji heslo #{formData.entry}`, formData);

    axios.put(
      `${baseUrl}entries/${formData.entry.id}`,
      {
        entry: formData.entry,
        exemps: formData.exemps,
      },
      {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        },
      }
    ).then(response => {
      alert('Heslo uloženo.');
    }, error => {
      console.log(error);
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const onSaveClick = () => {
    console.log('saving form', formData);

    if (formData.entry.id) {
      saveExisting();
    } else {
      alert('NEW');
      saveNew();
    }
  };

  // ExempForm events
  const setExempData = (key, data) => {
    console.log(`exemp data for ${key}:`, data);
    const newData = {
      entry: formData.entry,
      exemps: {
        ...formData.exemps,
        [key]: data,
      },
    };
    console.log('setExempData: ', newData);

    setFormData(newData);
  };

  const onAddClick = () => {
    setExempCounter(exempCounter + 1);
  };

  const exempComponents = [];
  for (let i = 0; i < exempCounter; i++) {
    exempComponents.push(
      <ExempForm data={formData.exemps[i] || {}} setData={setExempData} key={i} dataKey={i} />
    );
  }

  // TopForm events
  const handleValuesChange = (event) => {
    console.log(`Setting ${event.target.name} to ${event.target.value}`);

    const newEntry = {
      ...formData.entry,
      [event.target.name]: event.target.value,
    };

    setFormData({
      entry: newEntry,
      exemps: formData.exemps,
    });
  };

  const handleValuesCheckChange = event => {
    console.log(`Setting check ${event.target.name} to ${event.target.checked}`);

    const newEntry = {
      ...formData.entry,
      [event.target.name]: event.target.checked,
    };

    setFormData({
      entry: newEntry,
      exemps: formData.exemps,
    });
  };

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Grid container item xs={12} spacing={3}>
          <TopForm
            data={formData.entry}
            valuesChange={handleValuesChange}
            valuesCheckChange={handleValuesCheckChange}
          />
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
