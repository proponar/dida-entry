import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ApplicationBar = ({title}) => {
  const history = useHistory();
  const classes = useStyles();

  const goTo = (popupState, url) => {
    popupState.close();
    history.push(url);
  };

  const logout = () => {
		window.sessionStorage.removeItem('auth-token');
		window.sessionStorage.removeItem('user-name');
		window.localStorage.removeItem('auth');
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton
                  {...bindTrigger(popupState)}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => {goTo(popupState, '/exemps/')}}>Exemplifikace</MenuItem>
                  <MenuItem onClick={() => {goTo(popupState, '/sources/')}}>Zdroje</MenuItem>
                  <MenuItem onClick={() => {goTo(popupState, '/text-loc/')}}>Textové lokalizace</MenuItem>
                  <MenuItem onClick={() => {goTo(popupState, '/search/')}}>Vyhledávání</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <Typography variant="h6" className={classes.title}>
            DIDA
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={logout}>Odhlásit</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default ApplicationBar;
