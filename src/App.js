import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import SignIn from './SignIn.js';
import Listing from './Listing.js';
import Entry from './Entry.js';
import CsvUpload from './CsvUpload.js';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/entry/:id">
          <Entry />
        </Route>
        <Route path="/entry">
          <Entry />
        </Route>
        <Route path="/entries">
          <Listing />
        </Route>
        <Route path="/upload">
          <CsvUpload />
        </Route>
        <Route path="/">
           <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

const App2 = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
