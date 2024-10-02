import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react';
import Grid from '@mui/material/Grid2';
import DrawerComponent from './DrawerComponent';
import img from '../assets/images/image.png';
import { useAlert } from './AlterProvider';
const Navbar = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const handleLogOut = () => {
    Cookies.remove('splitWise-login-token');
    showAlert('logged out successfully');
    navigate('/login');
  };
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: 'Background', boxShadow: 'revert' }}
    >
      <Toolbar>
        {isMatch === true ? (
          <>
            <Box sx={{ width: '150px' }}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'contain',
                }}
                src={img}
                alt="spliter"
              />
            </Box>
            <DrawerComponent />
          </>
        ) : (
          <Grid
            container
            spacing={1}
            sx={{ width: '100%' }}
            alignContent={'center'}
          >
            <Grid size={6}>
              <Box sx={{ width: '150px' }}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                  src={img}
                  alt="spliter"
                />
              </Box>
            </Grid>
            <Grid size={6} alignContent={'center'}>
              <Box display={'flex'}>
                <Button
                  color="info"
                  variant="text"
                  size="large"
                  sx={{
                    marginLeft: 'auto',
                    fontWeight: 'normal',
                    borderRadius: '50px',
                  }}
                  component={RouterLink}
                  to={'/my-profile'}
                >
                  Profile
                </Button>
                <Button
                  color="info"
                  variant="outlined"
                  onClick={handleLogOut}
                  size="large"
                  sx={{
                    marginLeft: '20px',
                    fontWeight: 'normal',
                    borderRadius: '50px',
                    ':hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
