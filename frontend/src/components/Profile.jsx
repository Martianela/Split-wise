import {
  Avatar,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';

import React from 'react';
import profileimage from '../assets/images/profileiamge.png';
import { Link as RouterLink } from 'react-router-dom';
const Profile = () => {
  const [editable, setEditable] = React.useState(false);
  const my_profile = JSON.parse(localStorage.getItem('SplitWise-User'));
  function handleClick() {
    if (!editable) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          padding: '20px',
          mt: '20px',
          width: '300px',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{ mb: '20px', fontWeight: 200, textAlign: 'center' }}
        >
          Profile
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Avatar src={profileimage} sx={{ width: '100px', height: '100px' }} />
        </Box>
        <Stack spacing={2} sx={{ mt: '10px' }}>
          <Box>
            <Typography variant="body1" color="initial">
              username
            </Typography>
            <TextField
              id="username"
              value={
                my_profile.username.charAt(0).toUpperCase() +
                my_profile.username.slice(1)
              }
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              size="small"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="body1" color="initial">
              email
            </Typography>
            <TextField
              id="username"
              value={my_profile.email}
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              size="small"
              disabled
            />
          </Box>
          <Box>
            <Typography variant="body1" color="initial">
              bio
            </Typography>
            <TextField
              id="username"
              value={
                my_profile.bio.charAt(0).toUpperCase() + my_profile.bio.slice(1)
              }
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              size="small"
              disabled={editable}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ fontSize: '16px', fontWeight: 'light' }}
            onClick={handleClick}
          >
            {editable ? 'save' : 'edit'}
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: '16px', fontWeight: 'light' }}
            component={RouterLink}
            to={'/'}
          >
            Home
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
