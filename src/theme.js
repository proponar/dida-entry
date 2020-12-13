import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },

  // Fixing extra scrollbars in the AttachDialog when preview is on and present.
  // TODO: does this break something else?
  overrides: {
    MuiDialogContent: {
      root: {
        'overflow-x': 'hidden',
        'overflow-y': 'hidden',
      },
    }
  },
});

export default theme;
