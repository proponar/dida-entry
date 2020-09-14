import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import SignIn from './SignIn.js';
import Listing from './Listing.js';
import Entry from './Entry.js';
import CsvUpload from './CsvUpload.js';

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
        <Route path="/test">
          <CsvUpload />
        </Route>
        <Route path="/">
           <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
