import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { applicationTitle } from './config';
import HelpPopover from './HelpPopover';

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
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const ApplicationBar = ({title, help}) => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    document.title = applicationTitle;
  });

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
            {applicationTitle}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <HelpPopover
            id="appBarHelpPopover"
            help={help}
          />
          <Divider orientation="vertical" flexItem  className={classes.divider}/>
          <Button color="inherit" onClick={logout}>Odhlásit</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default ApplicationBar;
