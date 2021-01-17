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

export default function SourcesTable() {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(baseUrl + 'sources', {
      headers: {
        'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
      }
    }).then(response => {
      setRows(response.data.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.denseTable} size="small" aria-label="Seznam zdrojů">
        <TableHead>
          <TableRow>
            <TableCell component="th">Autor</TableCell>
            <TableCell component="th" align="right">Název</TableCell>
            <TableCell component="th" align="right">Název 2</TableCell>
            <TableCell component="th" align="right">Typ</TableCell>
            <TableCell component="th" align="right">Rok</TableCell>
            <TableCell component="th" align="right">Lokalizace</TableCell>
            <TableCell component="th" align="right">Lok. textová</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.autor}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.nazev2}</TableCell>
              <TableCell align="right">{row.typ}</TableCell>
              <TableCell align="right">{row.rok}</TableCell>
              <TableCell align="right">{row.lokalizace}</TableCell>
              <TableCell align="right">{row.lokalizace_text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
