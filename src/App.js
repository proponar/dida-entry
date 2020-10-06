import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import ProTip from './ProTip';
import ApplicationBar from './ApplicationBar.js';
import CsvUpload from './CsvUpload.js';
import CsvDownload from './CsvDownload.js';
import Entry from './Entry.js';
import ExempListing from './ExempListing.js';
import Listing from './Listing.js';
import MapView from './MapView.js';
import SignIn from './SignIn.js';
import SourcesTable from './SourcesTable.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/entry/:id">
          <React.Fragment>
            <ApplicationBar />
            <Entry />
          </React.Fragment>
        </Route>
        <Route path="/entry">
          <React.Fragment>
            <ApplicationBar />
            <Entry />
          </React.Fragment>
        </Route>
        <Route path="/exemps">
          <React.Fragment>
            <ApplicationBar title="Exemplifikace" />
            <ExempListing />
          </React.Fragment>
        </Route>
        <Route path="/entries">
          <React.Fragment>
            <ApplicationBar title="Hesla" />
            <Listing />
          </React.Fragment>
        </Route>
        <Route path="/upload">
          <CsvUpload />
        </Route>
        <Route path="/sources">
          <React.Fragment>
            <ApplicationBar title="Zdroje" />
            <SourcesTable />
            <CsvUpload />
            <CsvDownload />
            <Button onClick={localStorage.removeItem('sources')} color="primary">
              Obnovit Zdroje
            </Button>
          </React.Fragment>
        </Route>
        <Route path="/test">
          <CsvUpload />
        </Route>
        <Route path="/map">
          <MapView />
        </Route>
        <Route path="/">
           <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
