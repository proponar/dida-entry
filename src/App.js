import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import ApplicationBar from './ApplicationBar.js';
import Entry from './Entry.js';
import ExempListing from './ExempListing.js';
import MapView from './MapView.js';
import SignIn from './SignIn.js';
import SourcesListing from './SourcesListing.js';
import TextLocListing from './TextLocListing.js';
import Searcher from './Searcher.js';
import chipContext from './chipContext';

const App = () => {
  // snacks
  const [snack, setSnack] = React.useState({
    open: false,
    severity: 'success', // error, warning, info, success
    message: '',
  });
  const handleCloseSnack = () => setSnack({open: false});
  const successMsg = text => setSnack({open: true, severity: 'success', message: text});
  const errorMsg   = text => setSnack({open: true, severity: 'error', message: text});

  const snackbar = () => (
    <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity={snack.severity}>
        {snack.message}
      </Alert>
    </Snackbar>
  );

  return (
    <Router>
      <Switch>
        <Route path="/entry/:id">
          <React.Fragment>
            <ApplicationBar />
            <Entry />
          </React.Fragment>
        </Route>
        <Route path="/map">
          <MapView />
        </Route>

        <Route path="/exemps">
          <React.Fragment>
            <ApplicationBar title="Exemplifikace" help="exemplifikace"/>
            <chipContext.Provider value={{successMsg, errorMsg}}>
              <ExempListing />
            </chipContext.Provider>
            { snackbar() }
          </React.Fragment>
        </Route>

        <Route path="/sources">
          <React.Fragment>
            <ApplicationBar title="Zdroje" help="zdroje"/>
            <chipContext.Provider value={{successMsg, errorMsg}}>
              <SourcesListing />
            </chipContext.Provider>
            { snackbar() }
          </React.Fragment>
        </Route>

        <Route path="/text-loc">
          <React.Fragment>
            <ApplicationBar title="Textové lokalizace" help="textove_lokalizace"/>
            <chipContext.Provider value={{successMsg, errorMsg}}>
              <TextLocListing />
            </chipContext.Provider>
            { snackbar() }
          </React.Fragment>
        </Route>

        <Route path="/search">
          <React.Fragment>
            <ApplicationBar title="Vyhledávání" help="vyhledavani"/>
            <chipContext.Provider value={{successMsg, errorMsg}}>
              <Searcher />
            </chipContext.Provider>
            { snackbar() }
          </React.Fragment>
        </Route>

        <Route path="/">
          <chipContext.Provider value={{successMsg, errorMsg}}>
            <SignIn />
          </chipContext.Provider>
          { snackbar() }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
