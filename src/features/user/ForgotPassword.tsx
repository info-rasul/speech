import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectUser } from './slice';

import { useAppSelector } from '../../app/hooks';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MilkyWare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [emptyField, setEmptyField] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (user.email_verified) navigate('/dashboard');
  }, [navigate, user]);

  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
      setIsSent(true);
    } catch (error) {
      setError(true);
    }
  }

  async function changePassword() {
    if (verifyFields()) {
      try {
        await Auth.forgotPasswordSubmit(email, code, password);
        navigate('/');
      } catch (error) {
        setError(true);
      }
    }
  }

  const verifyFields = () => {
    setError(false);
    setEmptyField(false);
    // Verify if required fields are valid
    if (email && password && password === verifyPassword && code) {
      return true;
    } else {
      setEmptyField(true);
    }
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reiniciar Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {!isSent && (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              </Grid>
              {isSent && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="code"
                      label="Codigo de Verificacion"
                      name="code"
                      error={emptyField && !code}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      sx={{ marginY: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      label="Contrasena"
                      name="password"
                      error={
                        emptyField && (!password || password !== verifyPassword)
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="verifyPassword"
                      label="Verifica Contrasena"
                      name="verifyPassword"
                      error={
                        emptyField &&
                        (!verifyPassword || password !== verifyPassword)
                      }
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {error && (
              <Alert sx={{ marginTop: 1 }} severity="error">
                Credenciales incorrectas!
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={!isSent ? forgotPassword : changePassword}
              sx={{ marginY: 2 }}
            >
              Confirmar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Ya tienes cuenta? Entra aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
