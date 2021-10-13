import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import base64js from 'base64-js'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { baseUrl } from './config';
import chipContext from './chipContext';
import { applicationTitle } from './config';

import { GoogleLogin } from 'react-google-login';

const Copyright = () =>
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://cja.ujc.cas.cz/">
      Dialektologické oddělení Ústavu pro jazyk český AV ČR
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>

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

const SignIn = () => {
  const classes = useStyles();
  const chip = useContext(chipContext);

  useEffect(() => {
    document.title = applicationTitle;
  });

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const history = useHistory();

	const lStore = window.localStorage;
	const sStore = window.sessionStorage;

  const getAuth = () => {
    try {
      return JSON.parse(window.localStorage.getItem('auth'));
    } catch (_) {
      return null;
    }
  };

  // check for stored credentials
  useEffect(() => {
    const navigate = async () => {
      const auth = getAuth();

      if (auth && auth['auth-token']) { // TODO: check auth['date']
	      const sStore = window.sessionStorage;
	      sStore.setItem('auth-token', auth['auth-token']);
	      sStore.setItem('user-name', auth['user-name']);
        history.push('/exemps');
      }
    }

    navigate();
  }, [history]);

	const handleLoginSubmit = (event) => {
		axios.get(baseUrl + 'auth?requester_type=ui',
			{
				headers: {
					'Authorization': 'Basic ' + base64encode([login, password].join(':')),
				}
			}
		).then(loginSuccess).catch(loginError);

	  event.preventDefault();
	}

  const responseGoogleFailure = (response) => {
    chip.errorMsg('Neplatný login, nebo heslo.');
    console.log(response);
  }

  const loginSuccess = response => {
    if (remember) {
      lStore.setItem('auth', JSON.stringify({
		    'auth-token': response.data.auth_token,
		    'user-name': response.data.name,
        date: Date.now(),
      }));
    } else {
      lStore.removeItem('auth');
    }
		sStore.setItem('auth-token', response.data.auth_token);
		sStore.setItem('user-name', response.data.name);
		history.push('/exemps');
  }

  const loginError = err => {
    if (err.isAxiosError && err.request.status === 401) {
      chip.errorMsg('Neplatný login, nebo heslo.');
    } else {
      chip.errorMsg('Při přihlašovaní došlo k chybě.');
    }
  }

  const responseGoogleSuccess = (response) => {
    var token = response.tokenId
		axios.get(baseUrl + 'auth?requester_type=oauth',
			{
				headers: {
					'Authorization': 'Basic ' + base64encode([token, ''].join(':')),
				}
			}
		).then(loginSuccess).catch(loginError);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          {applicationTitle}
        </Typography>
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
            control={
              <Checkbox
                onClick={e => setRemember(e.target.checked)}
                checked={remember}
                name="remember" value="remember" color="primary"
              />
            }
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
      <div style={{textAlign: 'center'}}>
        <GoogleLogin
          clientId="463940228204-8h8413o241etnc0q0ifvjq57st8vde49.apps.googleusercontent.com"
          buttonText="Přihlásit účtem Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Box mt={8}>
       V případě, že nejste členy dialektologického oddělení ÚJČ, přihlásíte se pomocí tlačítka <b>Přihlásit účtem Google</b>. Je možné zřídit si zvláštní e-mail jen pro tento účel, zvláště pokud jste větší skupina/tým a chcete společně vytvářet jedinou databázi. K Vašim datům nemá přístup nikdo jiný, než kdo má přihlašovací údaje.
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;
