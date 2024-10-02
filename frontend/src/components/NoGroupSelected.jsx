import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
const NoGroupSelected = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{
          maxWidth: 100,
          maxHeight: 100,
          width: '100%',
          height: '100%',
        }}
      >
        <Groups2OutlinedIcon sx={{ fontSize: { xs: '60px' } }} />
      </Avatar>
    </Box>
  );
};

export default NoGroupSelected;
