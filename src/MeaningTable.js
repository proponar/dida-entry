import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import DialogMeaning from './DialogMeaning';

const MeaningTable = ({meanings, onChange}) => {
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [meaning, setMeaning] = useState({});

  const handleCellClick = meaning => {
    setMeaningOpen(true);
    setMeaning(meaning);
  }

  const handleNewMeaning = () => {
    setMeaningOpen(true);
    setMeaning({});
  }

  const handleMeaningSave = newMeaning => {
    console.log('handleMeaningSave: ', newMeaning);
    const newMeanings = (newMeaning.ord && 
      meanings.map((m, i) => i === newMeaning.ord ? newMeaning : m)) ||
      [...meanings, newMeaning];

    onChange({
      target: {
        name: 'meanings',
        value: newMeanings,
      }
    });

    setMeaningOpen(false);
  }

  const handleMeaningRemove = meaning => {
    console.log('handleMeaningRemove: ', meaning);
    meaning.ord &&
      onChange({
        target: {
          name: 'meanings',
          value: meanings.filter((m, i) => i !== meaning.ord)
        }
      });

    setMeaningOpen(false);
  }

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h6">Významy</Typography>
        <IconButton color="secondary" onClick={handleNewMeaning} aria-label="Přidat význam" >
          <Tooltip title="Přidat význam">
            <AddCircleOutline />
          </Tooltip>
        </IconButton>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="Seznam zdrojů">
          <TableHead>
            <TableRow>
              <TableCell component="th">Číslo</TableCell>
              <TableCell component="th">Kvalifikatory</TableCell>
              <TableCell component="th">Význam</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meanings.map((m, i) => (
              <TableRow key={m.id || i}>
                <TableCell onClick={() => handleCellClick({...m, ord: i})} align="left">{m.cislo}</TableCell>
                <TableCell onClick={() => handleCellClick({...m, ord: i})} align="left">{m.kvalifikator}</TableCell>
                <TableCell onClick={() => handleCellClick({...m, ord: i})} align="left">{m.vyznam}</TableCell>
              </TableRow>
            ))}
            {(meanings.length === 0) && <TableRow>
                <TableCell colSpan={3}>Přidejte alespoň jeden význam.</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <DialogMeaning
        open={meaningOpen}
        meaning={meaning}
        onSave={m => handleMeaningSave(m)}
        onRemove={m => handleMeaningRemove(m)}
        onClose={() => setMeaningOpen(false)}
      />
    </React.Fragment>
  );
}

export default MeaningTable;
