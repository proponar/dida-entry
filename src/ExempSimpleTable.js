import React, { useEffect, useState } from 'react';

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

import useStyles from "./useStyles";

const ExempSimpleTable = ({rows}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.listingTable} aria-label="Náhled importu exemplifikace">
        <TableHead>
          <TableRow>
            <TableCell>Exemplifikace</TableCell>
            <TableCell align="right">Kvalifikátor</TableCell>
            <TableCell align="right">Význam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.exemplifikace}
              </TableCell>
              <TableCell align="right">{row.kvalifikator}</TableCell>
              <TableCell align="right">{row.vyznam}</TableCell>
            </TableRow>
          ))}
         </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ExempSimpleTable;
