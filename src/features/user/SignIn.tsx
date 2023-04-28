import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from 'aws-amplify';
import useSpeechToText, { ResultType } from 'components/SpeechToText/hooks';
import { H6 } from 'components/Typography';
import NotificationsIcon from 'icons/NotificationsIcon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser, selectUser } from './slice';
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://milkyware.com/">
        MilkyWare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: false,
    googleApiKey: undefined,
    speechRecognitionProperties: { interimResults: true, lang: 'en-US' },
    useLegacyResults: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (user.email_verified) navigate('/dashboard');
    else if (user.username) navigate('/verify');
  }, [navigate, user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyField, setEmptyField] = useState(false);
  const [error, setError] = useState(false);

  const login = async () => {
    if (verifyFields()) {
      try {
        const user = await Auth.signIn(email, password);
        const newUser = {
          email: user.attributes.email,
          username: user.username,
          email_verified: user.attributes.email_verified,
          jwt: user.signInUserSession.accessToken.jwtToken,
        };
        dispatch(loginUser(newUser));
      } catch (error) {
        setError(true);
      }
    }
  };

  const verifyFields = () => {
    setError(false);
    setEmptyField(false);
    // Verify if required fields are valid
    if (email && password) {
      return true;
    } else {
      setEmptyField(true);
    }
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          container
          item
          xs={12}
          sm={4}
          md={7}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
            endIcon={<NotificationsIcon sx={{ color: 'text.disabled' }} />}
            sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
            data-recording={isRecording}
          >
            <H6 color="text.disabled">
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </H6>
          </Button>

          <ul>
            {(results as ResultType[]).map((result) => (
              <li key={result.timestamp}>{result.transcript}</li>
            ))}
            {interimResult && <li>{interimResult}</li>}
          </ul>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emptyField && !email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={emptyField && !password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && (
                <Alert severity="error">Credenciales incorrectas!</Alert>
              )}
              <Button
                fullWidth
                variant="contained"
                onClick={login}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
