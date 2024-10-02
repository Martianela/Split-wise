import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Montserrat', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Roboto',
    },
  },

  palette: {
    primary: {
      main: '#007BFF', // Primary color (Bright Blue)
    },
    secondary: {
      main: '#FF6F61', // Secondary color (Warm Coral Red)
    },
    background: {
      default: '#F5F5F5', // Light Gray for background
      paper: '#FFFFFF', // White for surface elements
    },
    text: {
      primary: '#333333', // Dark Gray for primary text
      secondary: '#757575', // Medium Gray for secondary text
    },
    success: {
      main: '#28A745', // Green for success
    },
    error: {
      main: '#DC3545', // Red for error
    },
  },
});

export default theme;
