import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            <TableCell component="th">Číslo</TableCell>
            <TableCell component="th">Autor</TableCell>
            <TableCell component="th" align="right">Název</TableCell>
            <TableCell component="th" align="right">Název 2</TableCell>
            <TableCell component="th" align="right">Typ</TableCell>
            <TableCell component="th" align="right">Rok</TableCell>
            <TableCell component="th" align="right">Rok sběru</TableCell>
            <TableCell component="th" align="right">Lokalizace</TableCell>
            <TableCell component="th" align="right">Lok. textová</TableCell>
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
