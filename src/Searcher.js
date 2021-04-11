import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Publish from '@material-ui/icons/Publish';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import EntryCombo from "./EntryCombo";
import FilterChips from "./FilterChips";
import RokInput from "./RokInput";
import TablePaginationActions from "./TablePaginationActions";
import VetneSwitch from "./VetneSwitch";

import useStyles from "./useStyles";
import chipContext from './chipContext';
import { baseUrl } from './config';

const Searcher = () => {
  const chip = useContext(chipContext);
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState({});

  // Paginator
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (_e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = e => (
    setRowsPerPage(parseInt(e.target.value, 10)), setPage(0));

  const [entry, setEntry] = useState(null);

  // Selected a new row/entry/heslo.
  const handleEntryChange = (_e, newEntry) => (newEntry &&
   (setEntry(newEntry), setPage(0)));
  // TODO add entry to filter

  // TODO: pass filter
  useEffect(() => {
    axios.get(baseUrl + `search`, {
      headers: {
        'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
      }
    }).then(response => setRows(response.data.data));
  }, []); // FIXME bude zalezet na filtrech

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <EntryCombo reload={0} onChange={handleEntryChange} onReload={() => {}} />
        <Tooltip title="Filtrovat hesla">
          <IconButton aria-label="Filtrovat hesla"><FilterListIcon /></IconButton>
        </Tooltip>
        <VetneSwitch checked={true} onChange={() => {}}/>
        <RokInput value={1997} onChange={() => {}}/>
        <FilterChips filter={filter} />
      </Toolbar>

      <TableContainer component={Paper}>
        <Table className={classes.listingTable} aria-label="Seznam exemplifikací">
          <TableHead>
            <TableRow>
              <TableCell component="th" style={{ paddingBottom: 0, paddingTop: 0, width: '20px' }}></TableCell>
              <TableCell component="th">Exemplifikace</TableCell>
              <TableCell component="th">Sl. druh</TableCell>
              <TableCell component="th">Heslo</TableCell>
              <TableCell component="th">Určení</TableCell>
              <TableCell component="th" align="right">Lokalizace</TableCell>
              <TableCell component="th" align="right">Zdroj</TableCell>
              <TableCell component="th" align="right">Rok</TableCell>
              <TableCell component="th" align="right">Význam</TableCell>
              <TableCell component="th" align="right">Větné</TableCell>
              <TableCell component="th" align="right">Aktivní</TableCell>
              <TableCell component="th" align="right">Čas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell align="center"> </TableCell>
                <TableCell> {row.exemplifikace} </TableCell>
                <TableCell> {row.druh} </TableCell>
                <TableCell align="right"> {row.entry} </TableCell>
                <TableCell align="right">{row.urceni}</TableCell>
                <TableCell align="right">{row.lokalizace_format}</TableCell>
                <TableCell align="right">{row.zdroj_name}</TableCell>
                <TableCell align="right">{row.rok}</TableCell>
                <TableCell align="right">{row.vyznam}</TableCell>
                <TableCell align="right">{row.vetne}</TableCell>
                <TableCell align="right">{row.aktivni}</TableCell>
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
              <TableCell colSpan={7}>
                <IconButton color="secondary" onClick={() => {}} aria-label="Přidat exemplifikaci" >
                  <Tooltip title="Přidat exemplifikaci">
                    <AddCircleOutline />
                  </Tooltip>
                </IconButton>
                <IconButton color="secondary" onClick={() => {}} aria-label="Importovat exemplifikace" >
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
    </Paper>
  );
}

export default Searcher;
