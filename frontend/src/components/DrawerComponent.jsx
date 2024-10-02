import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { GroupOutlined } from '@mui/icons-material';
const DrawerComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ paddingY: '10px', paddingX: '20px' }}>
          <Stack direction={'column'} sx={{ mt: '20px' }} spacing={1}>
            <Button variant="text">my transactions</Button>
            <Button variant="text" color="primary">
              Login
            </Button>
            <Button variant="text" sx={{ color: 'black' }}>
              Register
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setOpen(true)}>
        <MenuOutlinedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
