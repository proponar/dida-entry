import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddCircle from '@material-ui/icons/AddCircle';
import Edit from '@material-ui/icons/Edit';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Publish from '@material-ui/icons/Publish';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import EntryCombo from "./EntryCombo";
import DialogExemp from "./DialogExemp";
import DialogEntry from "./DialogEntry";
import DialogImport from "./DialogImport";

import useStyles from "./useStyles";
import { baseUrl } from './config';

const TablePaginationActions = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.listingRoot}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const prepareEntryData = (entry, edit) => {
  console.log('prepareEntryData: ', entry, edit);
  return (edit && entry) || {
    rod: 'm',
    druh: 'subst',
  };
};

const prepareExempData = (entry, exemp) => {
  console.log('prepareExempData: ', entry, exemp);
  if (exemp) {
    return {
      ...exemp
    };
  }

  return {
    entryId: (entry && entry.id) || null,
    // text: null
    // author_id: 1
    // author_name: "martin"
    // created_at: "2020-09-14T15:35:53.865Z"
    // updated_at: "2020-09-14T15:35:53.865Z"
    //heslo: "koleso"
    exemplifikace: '',
    kvalifikator: (entry && entry.kvalifikator) || null,
    // vyznam: "koleso augm. vetne adj. n."
    vetne: (entry && entry.vetne) || null,
    // druh: "adj"
    // rod: "n"
  };
};

const ExempListing = () => {
  const [rows, setRows] = useState([]);
  // const history = useHistory();

  const [entry, setEntry] = useState(null);
  const [reloadEx, setReloadEx] = useState(null);
  const [reloadEn, setReloadEn] = useState(null);

  const [selectedRow, setSelectedRow] = React.useState();
  const [editEntry, setEditEntry] = React.useState(false);

  // modal Exemp dialog
  const [exempOpen, setExempOpen] = React.useState(false);

  const handleClickExempOpen = () => { 
    setSelectedRow(null);
    setExempOpen(true);
  };

  const handleExempClose = () => setExempOpen(false);

  const storeNewExemp = (exemp, successFunc) => {
    axios.post(`${baseUrl}entries/${exemp.entryId}/exemps`,
      {...exemp},
      //{headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
      {headers: {Authorization: `Token ${window.localStorage.getItem('auth-token')}`}}
    ).then(response => {
      successFunc();
    }, error => {
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const storeExistingExemp = (exemp, successFunc) => {
    axios.put(`${baseUrl}entries/${exemp.entryId}/exemps/${exemp.id}`,
      {...exemp},
      {headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
    ).then(response => {
      successFunc();
    }, error => {
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const handleExempSave = (exemp) => {
    console.log('handleExempSave', exemp);

    const successF = () => {
      console.log('Exemplifikace uložena.');
      setReloadEx(Math.random());
    };

    if (exemp.id) {
      storeExistingExemp(exemp, successF);
    } else {
      storeNewExemp(exemp, successF);
    }
    setExempOpen(false);
  };

  // modal Heslo dialog
  const [hesloOpen, setHesloOpen] = React.useState(false);

  const handleClickHesloEdit = () => { setEditEntry(true); setHesloOpen(true); };
  const handleClickHesloNew = () => { setEditEntry(false); setHesloOpen(true); };
  const handleHesloClose = () => setHesloOpen(false);

  const handleClickImport = () => {
    setImportOpen(true);
  };


  const storeNewHeslo = (entry, successFunc) => {
    axios.post(`${baseUrl}entries`,
      {...entry},
      {headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
    ).then(response => {
      successFunc();
    }, error => {
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const storeExistingHeslo = (entry, successFunc) => {
    axios.put(`${baseUrl}entries/${entry.id}`, // FIXME: kde je ID?
      {...entry},
      {headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
    ).then(response => {
      successFunc();
    }, error => {
      console.log(error.response.data);
      alert(error.response.data.message);
    });
  };

  const handleHesloSave = (entry) => {
    console.log('handleHesloSave: ', entry);

    const successF = () => {
      console.log('Heslo uloženo.');
      setReloadEn(Math.random());
      setReloadEx(Math.random());
    };

    if (entry.id) {
      storeExistingHeslo(entry, successF);
    } else {
      storeNewHeslo(entry, successF);
    }

    setHesloOpen(false);
  }

  // Import wizard
  const [importOpen, setImportOpen] = React.useState(false);
  const handleImportClose = () => {
    setReloadEx(Math.random());
    setImportOpen(false);
  }

  // load exemps for selected entry, when entry changes or reload is requested
  useEffect(() => {
    if (entry) {
      axios.get(baseUrl + `entries/${entry.id}/exemps`, {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        }
      }).then(response => {
        setRows(response.data.data);
      });
    }
  }, [entry, reloadEx]);

  const classes = useStyles();

  // paginator
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = ev => {
    setRowsPerPage(parseInt(ev.target.value, 10));
    setPage(0);
  };

  const handleCellClick = row => {
    console.log('handleCellClick: ', row);
    setSelectedRow(row);
    setExempOpen(true);
    // history.push(`/entry/${rowId}`);
  };

  // selected row/entry/heslo
  const handleEntryChange = (e, entry) => (entry && setEntry(entry) && setSelectedRow(null));

  console.log('entryId=', (entry && entry.id) || null);
  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <EntryCombo reload={reloadEn} onChange={handleEntryChange} />
        <Tooltip title="Filtrovat hesla">
          <IconButton aria-label="Filtrovat hesla">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <IconButton color="secondary" onClick={handleClickHesloEdit} aria-label="Editovat heslo" >
          <Tooltip title="Editovat heslo">
            <Edit />
          </Tooltip>
        </IconButton>
        <IconButton color="secondary" onClick={handleClickHesloNew} aria-label="Přidat heslo" >
          <Tooltip title="Přidat heslo">
            <AddCircle />
          </Tooltip>
        </IconButton>
      </Toolbar>
      <DialogExemp
        open={exempOpen}
        onSave={handleExempSave}
        onClose={handleExempClose}
        data={prepareExempData(entry, selectedRow)} />
      <DialogEntry
        open={hesloOpen}
        onSave={handleHesloSave}
        onClose={handleHesloClose}
        data={prepareEntryData(entry, editEntry)} />
      <DialogImport
        open={importOpen}
        onClose={handleImportClose}
        entryId={(entry && entry.id) || null} />
      <TableContainer component={Paper}>
        <Table className={classes.listingTable} aria-label="Seznam exemplifikací">
          <TableHead>
            <TableRow>
              <TableCell>Exemplifikace</TableCell>
              <TableCell align="right">Kvalifikátor</TableCell>
              <TableCell align="right">Význam</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" onClick={() => handleCellClick(row)}>
                  {row.exemplifikace}
                </TableCell>
                <TableCell align="right">{row.kvalifikator}</TableCell>
                <TableCell align="right">{row.vyznam}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <IconButton color="secondary" onClick={handleClickExempOpen} aria-label="Přidat exemplifikaci" >
                  <Tooltip title="Přidat exemplifikaci">
                    <AddCircleOutline />
                  </Tooltip>
                </IconButton>
                <IconButton color="secondary" onClick={handleClickImport} aria-label="Importovat exemplifikace" >
                  <Tooltip title="Importovat exemplifikace">
                    <Publish />
                  </Tooltip>
                </IconButton>
              </TableCell>
              <TablePagination
                labelRowsPerPage="Řádků na stránce"
                rowsPerPageOptions={[10, 25, 50, { label: 'Všechny', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default ExempListing;
