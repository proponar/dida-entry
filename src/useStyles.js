import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    borderStyle: "solid",
    borderWidth: "1px",
    margin: "4px",
  },
  modalPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
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
}));

export default useStyles;
