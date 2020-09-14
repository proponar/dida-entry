import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import base64js from 'base64-js'                                                                    
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { baseUrl } from './config';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://cja.ujc.cas.cz/">
        Dialektologické oddělení Ústavu pro jazyk český AV ČR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const base64encode = str => base64js.fromByteArray(new window.TextEncoder('utf-8').encode(str));

export default function SignIn() {
  const classes = useStyles();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleLoginSubmit = (event) => {
		axios.get(baseUrl + 'auth?requester_type=ui',
			{
				headers: {
					//'X-Auth-Token': undefined,
					'Authorization': 'Basic ' + base64encode([login, password].join(':')),
				}
			}
		).then(response => {
			window.localStorage.setItem('auth-token', response.data.auth_token);
			history.push('/entries');
		});

	  event.preventDefault();
	}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Přihlášení
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
          <TextField
						onChange={e => setLogin(e.target.value)}
						value={login}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Uživatelské jméno"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
						onChange={e => setPassword(e.target.value)}
						value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Heslo"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamatovat přihlášení"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Přihlásit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
