import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { login } from '../../utils/api.calls';
import { useAlert } from './AlterProvider';
import Cookies from 'js-cookie';
const Login = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const props = { username: username, password: password };
    try {
      const res = await login(props);
      if (res.success) {
        localStorage.setItem('SplitWise-User', JSON.stringify(res.data));
        Cookies.set('splitWise-login-token', res.token, {
          expires: 0.9 / 24,
        });
        showAlert(res.message, 'success');
        navigate('/');
      }
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#ffffff',
      }}
    >
      <Box
        sx={{
          maxWidth: '300px',
          maxHeight: '700px',
          borderRadius: '20px',
          overflow: 'hidden',
          py: '20px',
          px: '30px',
          alignItems: 'center',
        }}
      >
        <LockOpenIcon fontSize="large" color="primary" sx={{ width: '100%' }} />
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: '20px',
            width: '100%',
            fontFamily: 'Montserrat',
            fontWeight: '500',
          }}
        >
          login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            placeholder="username"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            placeholder="password"
            label="password"
            margin="dense"
            fullWidth
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: '20px',
              px: '30px',
              bgcolor: 'text.primary',
              width: '100%',
              fontSize: '20px',
              textTransform: 'capitalize',
              fontWeight: 'light',
            }}
            type="submit"
          >
            login
          </Button>
          <Button
            component={RouterLink}
            to={'/register'}
            variant="text"
            color="primary"
            size="large"
            sx={{
              mt: '20px',
              width: '100%',
              fontSize: '20px',
              textTransform: 'capitalize',
              fontWeight: 'normal',
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
