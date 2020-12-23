import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    // borderStyle: "solid",
    // borderWidth: "1px",
    // margin: "4px",
  },
  modalPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  mainButtons: {
    paddingLeft: '20px',
    paddingTop: '20px',
  },
  autosizeWrap: {
    display: 'flex',
    paddingRight: '10px',
  },
  hiddenInput: {
      display: 'none'
  },
  listingTable: {
    minWidth: 500,
  },
  listingRoot: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  denseTable: {
    minWidth: 650,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  chipPaper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cellAlert: {
    backgroundColor: '#e57373',
    fond: 'white',
  },
  meaningCell: { // FIXME: this does not work when used as class in EntryForm, why?
    marginBottom: '30px',
  }
}));

export default useStyles;
