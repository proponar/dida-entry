import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import GetApp from '@material-ui/icons/GetApp';
import Subject from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import LinearProgress from '@material-ui/core/LinearProgress';
import { saveAs } from 'file-saver';

import EntryCombo from "./EntryCombo";
import FilterChips from "./FilterChips";
import RokInput from "./RokInput";
import TablePaginationActions from "./TablePaginationActions";
import LokalizaceInput from "./LokalizaceInput";

import useStyles from "./useStyles";
import chipContext from './chipContext';
import { baseUrl } from './config';

const VetneSmallSwitch = ({checked, onChange}) => (
  <FormControl style={{marginLeft: "20px", marginRight: "20px", marginTop: "5px"}}>
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>Nevětné</Grid>
      <Grid item>
        <Switch
          color="primary"
          checked={checked}
          onChange={onChange}
          name="vetne"
        />
      </Grid>
      <Grid item>Větné</Grid>
    </Grid>
  </FormControl>
);

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

  const [loading, setLoading] = useState(false);

  const handleEntryChange = (_e, newEntry) => {
    if (! newEntry) {
      return
    }
    setPage(0)
    setFilter({
      ...filter,
      entry: { heslo: newEntry.heslo, id: newEntry.id },
    })
  }

  const handleVetneChange = ({target}) => {
    setFilter({
      ...filter,
      vetne: target.checked
    })
  }

  const handleRokChange = ({target}) => {
    setFilter({
      ...filter,
      rok: target.value,
    })
  }

  const handleExempChange = ({target}) => {
    setFilter({
      ...filter,
      exemp: target.value,
    })
  }

  const handleObecChange = (v) => {
    let newFilter = ({
      ...filter,
      obec: v
    })

    if (v.lokalizace_obec_id === undefined) {
      delete(newFilter['obec']);
    }

    setFilter(newFilter)
  };

  const handleCastChange = (v) => {
    let newFilter = ({
      ...filter,
      castObce: v
    })

    if ((v.lokalizace_cast_obce_id === undefined) ||
        (v.lokalizace_cast_obce_id === null)) {
      delete(newFilter['castObce']);
    }

    setFilter(newFilter)
  };

  const handleOblastChange = (v) => {
    if (v !== null) {
      setFilter({
        ...filter,
        oblast: v
      })
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.post(
      baseUrl + `search`,
      filter, {
        headers: {
          Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
        }
    }).then(response => {
      setLoading(false);
      chip.successMsg(response.data.message);
      setRows(response.data.data);
    });
  }, [filter]);

  const handleCSVDownload = () => {
    setLoading(true);
    axios.post(
      baseUrl + `search?d=1`,
      filter, {
        headers: {
          Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
        }
    }).then(response => {
      setLoading(false);
			saveAs(new Blob([response.data], {type: "text/csv;charset=utf-8"}), 'exemps-filtered.csv');
    });
  }

  const handleDocxDownload = () => {
    setLoading(true);
    axios.post(
      baseUrl + `search?w=1`,
      filter, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Token ${window.sessionStorage.getItem('auth-token')}`,
        }
    }).then(response => {
      setLoading(false);
			saveAs(new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}), 'exemps-filtered.docx');
    });
  }

  const deleteChip = chip => {
    var newFilter = { ...filter };
    delete(newFilter[chip]);
    setFilter(newFilter);
  };

  const valueObec = (filter.obec && filter.obec.lokalizace_obec_id && {
    naz_obec: filter.obec.lokalizace_obec_text,
    kod_obec: filter.obec.lokalizace_obec_id
  }) || undefined;

//  const valueCast = (filter.obec && filter.obect.lokalizace_cast_obce_id && {
//    naz_cob: values.lokalizace_cast_obce_text,
//    kod_cob: values.lokalizace_cast_obce_id
//  }) || undefined;

//  // pozor: jedna se o CISLO textove lokalizace
//  const valueText = values && values.lokalizace_text_id;

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <EntryCombo reload={0} onChange={handleEntryChange} onReload={() => {}} />
        &nbsp;
        <FormControl>
          <TextField
            name="exemp" variant="filled" margin="dense" label="Exemplifikace"
            value={filter.exemp}
            onChange={handleExempChange}
          />
        </FormControl>
        <VetneSmallSwitch checked={!! filter.vetne} onChange={handleVetneChange}/>
        &nbsp;
        <RokInput dense={true} value={filter.rok} onChange={handleRokChange}/>
        <LokalizaceInput dense={true}
          valueObec={valueObec} valueCast={filter.castObce} valueText={filter.oblast}
          onObecChange={handleObecChange} onCastChange={handleCastChange} onTextChange={handleOblastChange}
        />
      </Toolbar>
      <FilterChips filter={filter} onDelete={deleteChip}/>
      {loading ? (<LinearProgress />) :
      (
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
                <TableCell align="right"> {row.heslo} </TableCell>
                <TableCell align="right">{row.urceni}</TableCell>
                <TableCell align="right">{row.lokalizace_format}</TableCell>
                <TableCell align="right">{row.zdroj_name}</TableCell>
                <TableCell align="right">{row.rok}</TableCell>
                <TableCell align="right">{row.vyznam}</TableCell>
                <TableCell align="right">{(row.vetne && 'ano') || 'ne'}</TableCell>
                <TableCell align="right">{(row.aktivni && 'ano') || 'ne'}</TableCell>
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
              <TableCell colSpan={3}>
                <IconButton color="secondary" onClick={handleCSVDownload} aria-label="Export do CSV" >
                  <Tooltip title="Export do CSV">
                    <GetApp />
                  </Tooltip>
                </IconButton>
                <IconButton color="secondary" onClick={handleDocxDownload} aria-label="Export do Wordu" >
                  <Tooltip title="Export do Wordu">
                    <Subject />
                  </Tooltip>
                </IconButton>
              </TableCell>
              <TablePagination
                labelRowsPerPage="Řádků na stránce"
                rowsPerPageOptions={[10, 25, 50, { label: 'Všechny', value: -1 }]}
                colSpan={9}
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
      )}
    </Paper>
  );
}

export default Searcher;
