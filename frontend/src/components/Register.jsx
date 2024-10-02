import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import loginbgimage from '../assets/images/loginbgimage.jpg';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { register } from '../../utils/api.calls';
import { useAlert } from './AlterProvider';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const props = {
      username: username,
      password: password,
      email: email,
      bio: desc,
    };
    const res = await register(props);
    if (res.success) {
      showAlert(res.message);
      navigate('/login');
    } else {
      showAlert(res.message, 'error');
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '300px',
          maxHeight: '700px',
          px: '30px',
          py: '20px',
          borderRadius: '20px',
        }}
      >
        {' '}
        <LockOpenIcon
          color="primary"
          sx={{ width: '100%', fontSize: '50px' }}
        />
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: '30px',
            width: '100%',
            fontFamily: 'Montserrat',
            fontWeight: '500',
          }}
        >
          Register
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
            sx={{ bgcolor: 'inharit' }}
          />
          <TextField
            id="email"
            placeholder="email"
            label="email"
            margin="dense"
            fullWidth
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: 'inharit', input: { color: 'primary' } }}
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
            sx={{ bgcolor: 'inharit' }}
          />{' '}
          <TextField
            id="description"
            placeholder="description"
            label="description"
            margin="dense"
            fullWidth
            variant="outlined"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            sx={{ bgcolor: 'inharit' }}
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
            Register
          </Button>
          <Button
            component={RouterLink}
            to={'/login'}
            variant="text"
            color="primary"
            size="large"
            sx={{
              mt: '20px',
              px: '30px',
              width: '100%',
              fontSize: '20px',
              textTransform: 'capitalize',
              fontWeight: 'normal',
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
