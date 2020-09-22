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
        'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
      }
    }).then(response => {
      setRows(response.data.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.denseTable} size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
          <TableCell>Název</TableCell>
          <TableCell align="right">Typ</TableCell>
          <TableCell align="right">Rok</TableCell>
          <TableCell align="right">Lokalizace</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.typ}</TableCell>
                <TableCell align="right">{row.rok}</TableCell>
                <TableCell align="right">{row.lokalizace}</TableCell>
                </TableRow>
              ))}
      </TableBody>
      </Table>
    </TableContainer>
  );
}
