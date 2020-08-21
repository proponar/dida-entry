import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";

import TopForm from './TopForm.js';

export default function Entry() {
  return (
    <Grid container item xs={12} spacing={3}>
      <TopForm />
    </Grid>
  );
}
