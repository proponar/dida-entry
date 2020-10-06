import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddCircle from '@material-ui/icons/AddCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Publish from '@material-ui/icons/Publish';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import EntryCombo from "./EntryCombo";
import DialogExemp from "./DialogExemp";
import DialogEntry from "./DialogEntry";

import useStyles from "./useStyles";
import { baseUrl } from './config';

const TablePaginationActions = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.listingRoot}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const prepareExempData = (entry, exemp) => {
	console.log('prepareExempData: ', entry, exemp);
	if (exemp) {
		return {
			...exemp
		};
	}

	return {
		entryId: (entry && entry.id) || null, 
		// text: null
		// author_id: 1
		// author_name: "martin"
		// created_at: "2020-09-14T15:35:53.865Z"
		// updated_at: "2020-09-14T15:35:53.865Z"
		//heslo: "koleso"
		exemplifikace: '',
		kvalifikator: (entry && entry.kvalifikator) || null,
		// vyznam: "koleso augm. vetne adj. n."
		vetne: (entry && entry.vetne) || null,
		// druh: "adj"
		// rod: "n"
	};
};

const ExempListing = () => {
  const [rows, setRows] = useState([]);
	const history = useHistory();

	const [entry, setEntry] = useState(null);
	const [reload, setReload] = useState(null);

	// modal Exemp dialog
  const [exempOpen, setExempOpen] = React.useState(false);

  const handleClickExempOpen = () => { setExempOpen(true); };
  const handleExempClose = () => setExempOpen(false);

	const handleExempSave = (exemp) => {
		console.log('handleExempSave', exemp);

    axios.post(
      `${baseUrl}entries/${exemp.entryId}/exemps`,
      {
        ...exemp
      },
      {
        headers: {
          'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
        },
      }
    ).then(response => {
      console.log('Exemplifikace uložena.');
			setReload(Math.random());
    }, error => {
      console.log(error);
      console.log(error.response.data);
      alert(error.response.data.message);
    });

		setExempOpen(false);
	}

	// modal Heslo dialog
  const [hesloOpen, setHesloOpen] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState();

  const handleClickHesloOpen = () => { setHesloOpen(true); };
  const handleHesloClose = () => setHesloOpen(false);

	const handleHesloSave = () => {
		console.log('handleHesloSave');
		setHesloOpen(false);
	}

  useEffect(() => {
		if (entry) {
    	axios.get(baseUrl + `entries/${entry.id}/exemps`, {
    	  headers: {
    	    'Authorization': 'Token ' + window.localStorage.getItem('auth-token')
    	  }
    	}).then(response => {
    	  setRows(response.data.data);
    	});
		}
  }, [entry, reload]);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellClick = row => {
		console.log('handleCellClick: ', row);
		setSelectedRow(row);
  	setExempOpen(true);
	  // history.push(`/entry/${rowId}`);
  };

	const handleEntryChange = (e, entry) => (entry && setEntry(entry) && setSelectedRow(null));

  return (
    <Paper className={classes.paper}>
			<Toolbar>
				<EntryCombo onChange={handleEntryChange} />
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
			</Toolbar>
      <DialogExemp
				open={exempOpen}
				onSave={handleExempSave}
				onClose={handleExempClose}
				data={prepareExempData(entry, selectedRow)} />
      <DialogEntry
				open={hesloOpen}
				onSave={handleHesloSave}
				onClose={handleHesloClose}
				data={{}} />
      <TableContainer component={Paper}>
        <Table className={classes.listingTable} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Exemplifikace</TableCell>
              <TableCell align="right">Kvalifikátor</TableCell>
              <TableCell align="right">Význam</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" onClick={() => handleCellClick(row)}>
                  {row.exemplifikace}
                </TableCell>
                <TableCell align="right">{row.kvalifikator}</TableCell>
                <TableCell align="right">{row.vyznam}</TableCell>
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
              <TableCell>
                <IconButton color="secondary" onClick={handleClickExempOpen} aria-label="Přidat exemplifikaci" >
								  <Tooltip title="Přidat exemplifikaci">
                	  <AddCircleOutline />
								  </Tooltip>
                </IconButton>
                <IconButton color="secondary" aria-label="Importovat exemplifikace" >
								  <Tooltip title="Importovat exemplifikace">
										<Publish />
								  </Tooltip>
                </IconButton>
                <IconButton color="secondary" onClick={handleClickHesloOpen} aria-label="Přidat heslo" >
								  <Tooltip title="Přidat heslo">
										<AddCircle />
								  </Tooltip>
                </IconButton>
              </TableCell>
              <TablePagination
                labelRowsPerPage="Řádků na stránce"
                rowsPerPageOptions={[10, 25, 50, { label: 'Všechny', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
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
export default ExempListing;
