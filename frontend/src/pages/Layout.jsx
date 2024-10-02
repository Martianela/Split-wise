import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';

const Layout = () => {
  return (
    <Container maxWidth="lg" id="layout">
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
