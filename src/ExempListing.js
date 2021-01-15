/* eslint-disable no-sequences */
import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
import AddCircle from '@material-ui/icons/AddCircle';
import AttachFileIcon from '@material-ui/icons/AttachFile';
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
import AttachDialog from "./AttachDialog";
import TablePaginationActions from "./TablePaginationActions";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from "./useStyles";
import chipContext from './chipContext';
import { baseUrl } from './config';

const prepareEntryData = (entry, edit) => {
  return (edit && entry) || {
    author_name: window.localStorage.getItem('user-name'),
    vetne: true,
    rod: 'm',
    druh: 'subst',
  };
};

const prepareExempData = (entry, exemp) => {
  if (exemp) {
    return {
      entryId: (entry && entry.id) || null,
      tvar_map: (entry && entry.tvar_map) || null,
      meanings: (entry && entry.meanings) || null,
      ...exemp
    };
  }

  return {
    // FIXME: vic hodnot? rok, rod, vyznam?
    entryId: (entry && entry.id) || null,
    tvar_map: (entry && entry.tvar_map) || null,
    meanings: (entry && entry.meanings) || null,

    // exemplifikace: '',
    // kvalifikator: (entry && entry.kvalifikator) || null,
    vetne: (entry && entry.vetne) || null,
    aktivni: true,
    vyznam: (entry && entry.vyznam) || '',
  };
};

const ExempListing = () => {
  const chip = useContext(chipContext);
  // const history = useHistory();

  const [rows, setRows] = useState([]);
  const [entry, setEntry] = useState(null);
  const [reloadEx, setReloadEx] = useState(null);
  const [reloadEn, setReloadEn] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const [editEntry, setEditEntry] = useState(false);

  // modal Exemp dialog
  const [exempOpen, setExempOpen] = useState(false);

  // modal Attachment dialog
  const [attachOpen, setAttachOpen] = useState(false);

  // Reload exemps in case some Attachments were removed.
  // FIXME: we could check if the reload is actually needed.
  const handleAttachCloseClick = () => (setAttachOpen(false), setReloadEx(Math.random()));

  const handleAttachSaveClick = files => {
    setAttachOpen(false);

    const entryId = entry.id;
    const exempId = selectedRow.id;

    // Upload files one by one.
    // FIXME: collect promises, wait for all?
    files.forEach(file => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(e.target.result);
        axios.post( // /api/entries/:entry_id/exemps/:exemp_id/attach(.:format)
          baseUrl + `entries/${entryId}/exemps/${exempId}/attach`,
          e.target.result, {
            headers: {
              "X-File-Name": file.name,
              Authorization: `Token ${window.localStorage.getItem('auth-token')}`,
              "Content-Type": "application/octet-stream; charset=binary",
            }
          }
        ).then(response => {
          // FIXME: some progress bar, maybe?
          // FIXME: we could reload after uploading ALL files.
          setReloadEx(Math.random());
          chip.successMsg(response.data.message);
        }, error => {
          console.log(error);
          console.log(error.response);
          chip.errorMsg(error.response.data.message);
        });
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleClickExempOpen = () => {
    if (entry) {
      setSelectedRow(null);
      setExempOpen(true);
    } else {
      chip.errorMsg('Nejdříve, prosím, vyberte heslo.');
    }
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
      chip.errorMsg(error.response.data.message);
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
      chip.errorMsg(error.response.data.message);
    });
  };

  const handleExempSave = (exemp) => {
    const successF = () => {
      chip.successMsg('Exemplifikace uložena.');
      setExempOpen(false);
      setReloadEx(Math.random());
    };

    if (exemp.id) {
      storeExistingExemp(exemp, successF);
    } else {
      storeNewExemp(exemp, successF);
    }
  };

  const handleExempDelete = exemp => {
    if (!exemp.id) return;

    axios.delete(`${baseUrl}entries/${exemp.entryId}/exemps/${exemp.id}`,
      {headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
    ).then(response => {
      setReloadEx(Math.random());
      setExempOpen(false);
    }, error => {
      console.log(error.response.data);
      chip.errorMsg(error.response.data.message);
    });
  };

  // modal Heslo dialog
  const [hesloOpen, setHesloOpen] = useState(false);

  const handleClickHesloEdit = () => { setEditEntry(true); setHesloOpen(true); };
  const handleClickHesloNew = () => { setEditEntry(false); setHesloOpen(true); };
  const handleHesloClose = () => setHesloOpen(false);

  const handleClickImport = () => setImportOpen(true);

  const storeNewHeslo = (entry, successFunc) => {
    axios.post(`${baseUrl}entries`,
      {...entry},
      {headers: {'Authorization': 'Token ' + window.localStorage.getItem('auth-token')}}
    ).then(response => {
      successFunc();
    }, error => {
      console.log(error.response.data);
      chip.errorMsg(error.response.data.message);
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
      chip.errorMsg(error.response.data.message);
    });
  };

  const handleHesloSave = (entry) => {
    const successF = () => {
      chip.successMsg('Heslo uloženo.');
      // Request reload of both Entry and Exemp.
      setHesloOpen(false);
      setReloadEn(Math.random());
      setReloadEx(Math.random());
    };

    if (entry.id) {
      storeExistingHeslo(entry, successF);
    } else {
      storeNewHeslo(entry, successF);
    }
  }

  // Import wizard
  const [importOpen, setImportOpen] = useState(false);
  const handleImportClose = () => (setReloadEx(Math.random()), setImportOpen(false));

  // Load exemps for selected entry, when entry changes or reload is requested
  // via reloadEx.
  useEffect(() => {
    if (entry) {
      axios.get(baseUrl + `entries/${entry.id}/exemps`, {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        }
      }).then(response => setRows(response.data.data));
    }
  }, [entry, reloadEx]);

  const classes = useStyles();

  // Paginator
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = e => (
    setRowsPerPage(parseInt(e.target.value, 10)), setPage(0));

  // Popup menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // When table cell is clicked, open pop-up menu.
  const handleCellClick = (e, row) => (setSelectedRow(row),
    setMenuAnchorEl(e.currentTarget));

  // Open Exemp edit dialog.
  // history.push(`/entry/${rowId}`);
  const openExemp = () => (setExempOpen(true), setMenuAnchorEl(null));

  // Open Exemp attachments dialog.
  const openAttach = () => (setAttachOpen(true), setMenuAnchorEl(null));

  // Selected a new row/entry/heslo.
  const handleEntryChange = (_e, newEntry) => (newEntry &&
   (setEntry(newEntry), setPage(0), setSelectedRow(null)));

  // selected entry was reloaded
  const handleEntryReload = entries => (setEntry(
    entries.find(e => e.id === (entry && entry.id))
  ));

  const formatLokalizaceText = text => (text &&
    <React.Fragment>
      <br />
      <small>{text}</small>
    </React.Fragment>
  ) || '';

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <EntryCombo reload={reloadEn} onChange={handleEntryChange} onReload={handleEntryReload} />
        <Tooltip title="Filtrovat hesla">
          <IconButton aria-label="Filtrovat hesla"><FilterListIcon /></IconButton>
        </Tooltip>
        <IconButton color="secondary" onClick={handleClickHesloEdit} aria-label="Editovat heslo" >
          <Tooltip title="Editovat heslo"><Edit /></Tooltip>
        </IconButton>
        <IconButton color="secondary" onClick={handleClickHesloNew} aria-label="Přidat heslo" >
          <Tooltip title="Přidat heslo"><AddCircle /></Tooltip>
        </IconButton>
      </Toolbar>
      <DialogExemp
        open={exempOpen}
        onSave={handleExempSave}
        onClose={handleExempClose}
        onDelete={handleExempDelete}
        data={prepareExempData(entry, selectedRow)} />
      <DialogEntry
        open={hesloOpen}
        onSave={handleHesloSave}
        onClose={handleHesloClose}
        data={prepareEntryData(entry, editEntry)} />
      <DialogImport
        open={importOpen}
        onClose={handleImportClose}
        meanings={(entry && entry.meanings) || null}
        entryId={(entry && entry.id) || null} />
      <AttachDialog
        open={attachOpen}
        onClose={handleAttachCloseClick}
        onSave={handleAttachSaveClick}
        data={prepareExempData(entry, selectedRow)}
      />
      <TableContainer component={Paper}>
        <Table className={classes.listingTable} aria-label="Seznam exemplifikací">
          <TableHead>
            <TableRow>
              <TableCell component="th" style={{ paddingBottom: 0, paddingTop: 0, width: '20px' }}></TableCell>
              <TableCell component="th">Exemplifikace</TableCell>
              <TableCell component="th" align="right">Lokalizace</TableCell>
              <TableCell component="th" align="right">Zdroj</TableCell>
              <TableCell component="th" align="right">Kvalifikátor</TableCell>
              <TableCell component="th" align="right">Význam</TableCell>
              <TableCell component="th" align="right">Čas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  {(row.attachments && row.attachments.length > 0) && <AttachFileIcon size="small" />}
                </TableCell>
                <TableCell onClick={e => handleCellClick(e, row)}>
                  {row.exemplifikace}
                </TableCell>
                <TableCell align="right">
                  {row.lokalizace_format}
                  {formatLokalizaceText(row.lokalizace_text)}
                </TableCell>
                <TableCell align="right">{row.zdroj_name}</TableCell>
                <TableCell align="right">{row.kvalifikator}</TableCell>
                <TableCell align="right">{row.vyznam}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
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
              <TableCell colSpan={2}>
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
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Řádků na stránce' },
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
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={openExemp}>Editovat</MenuItem>
        <MenuItem onClick={openAttach}>Připojené soubory</MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)}>Mapa</MenuItem>
      </Menu>
    </Paper>
  );
}
export default ExempListing;
