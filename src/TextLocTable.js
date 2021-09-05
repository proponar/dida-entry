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

const TextLocTable = ({onStart, onFinish}) => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    onStart && onStart();
    axios.get(baseUrl + 'location_texts', {
      headers: {
        'Authorization': 'Token ' + window.sessionStorage.getItem('auth-token')
      }
    }).then(response => {
      const sources = response.data.data;
      onFinish && onFinish();
      setRows(sources);
      localStorage.setItem('lokalizace_text', JSON.stringify(sources));
    });
  }, []);

  return (
    <TableContainer component={Paper} style={{height: "95vh"}}>
      <Table stickyHeader className={classes.denseTable} size="small" aria-label="Seznam textových lokalizací">
        <TableHead>
          <TableRow>
            <TableCell component="th">Číslo</TableCell>
            <TableCell component="th">Identifikátor</TableCell>
            <TableCell component="th" align="right">Presentace</TableCell>
            <TableCell component="th" align="right">Definice</TableCell>
            <TableCell component="th" align="right">Zdroje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.cislo}</TableCell>
              <TableCell>{row.identifikator}</TableCell>
              <TableCell align="right">{row.presentace}</TableCell>
              <TableCell align="right">{row.definice}</TableCell>
              <TableCell align="right">{row.zdroje}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TextLocTable;
