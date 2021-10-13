import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import useStyles from "./useStyles";
import { baseUrl } from './config';

const SourcesTable = ({reloadCounter, onStart, onFinish}) => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    onStart && onStart();
    axios.get(baseUrl + 'sources', {
      headers: {
        'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
      }
    }).then(response => {
      const sources = response.data.data;
      onFinish && onFinish();
      setRows(sources);
      localStorage.setItem('sources', JSON.stringify(sources));
    });
  }, [reloadCounter]);

  return (
    <TableContainer component={Paper} style={{height: "90vh"}}>
      <Table stickyHeader className={classes.denseTable} size="small" aria-label="Seznam zdrojů">
        <TableHead>
          <TableRow>
            <Tooltip title="Pořadí zdroje" placement="bottom-start"><TableCell component="th">Číslo</TableCell></Tooltip>
            <Tooltip title="Příjmení a jméno autora zdroje" placement="bottom-end"><TableCell component="th">Autor</TableCell></Tooltip>
            <Tooltip title="Názvový údaj zdroje"><TableCell component="th" align="right">Název</TableCell></Tooltip>
            <Tooltip title="Názvový údaj zdrojového dokumentu"><TableCell component="th" align="right">Název 2</TableCell></Tooltip>
            <Tooltip title="Typ nosiče zdroje"><TableCell component="th" align="right">Typ</TableCell></Tooltip>
            <Tooltip title="Rok vydání zdroje"><TableCell component="th" align="right">Rok</TableCell></Tooltip>
            <Tooltip title="Rok získání dat zdroje"><TableCell component="th" align="right">Rok sběru</TableCell></Tooltip>
            <Tooltip title="Místo původu dat ve zdroji"><TableCell component="th" align="right">Lokalizace</TableCell></Tooltip>
            <Tooltip title="Oblast původu dat ve zdroji"><TableCell component="th" align="right">Oblast</TableCell></Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.cislo}</TableCell>
              <TableCell>{row.autor}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.nazev2}</TableCell>
              <TableCell align="right">{row.typ}</TableCell>
              <TableCell align="right">{row.rok}</TableCell>
              <TableCell align="right">{row.rok_sberu}</TableCell>
              <TableCell align="right">{row.lokalizace}</TableCell>
              <TableCell align="right">{row.lokalizace_text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SourcesTable;
