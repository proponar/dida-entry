import React from 'react';
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

export default function ApplicationBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
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
      					  <MenuItem onClick={popupState.close}>Hesla</MenuItem>
      					  <MenuItem onClick={popupState.close}>Zdroje</MenuItem>
      					</Menu>
							</React.Fragment>
						)}
					</PopupState>
          <Typography variant="h6" className={classes.title}>
            DIDA
          </Typography>
          <Button color="inherit">Odhlasit</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
