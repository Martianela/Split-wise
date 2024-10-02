import { CircularProgress, Grid2, Tab, Tabs } from '@mui/material';
import React, { lazy, Suspense, useEffect } from 'react';
import PageNavigationList from '../components/PageNavigationList';
const Expense = lazy(() => import('../components/Expense'));
const Groups = lazy(() => import('../components/Groups'));
const Tranactions = lazy(() => import('../components/Tranactions'));

const Home = () => {
  const [page, setPage] = React.useState(() => {
    return window.location.hash ? window.location.hash.substring(1) : 'home';
  });
  useEffect(function () {
    const handleHashChange = () => {
      setPage(window.location.hash.substring(1));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  const handleSectionChange = function (section) {
    window.location.hash = section;
    setPage(section);
  };
  const renderContent = () => {
    switch (page) {
      case 'home':
        return (
          <Suspense>
            <Expense />
          </Suspense>
        );
      case 'groups':
        return (
          <Suspense fallback={<CircularProgress />}>
            <Groups />
          </Suspense>
        );
      case 'my-transaction':
        return (
          <Suspense>
            <Tranactions />
          </Suspense>
        );
      default:
        return (
          <Suspense>
            <Expense />
          </Suspense>
        );
    }
  };
  return (
    <Grid2 container spacing={1} sx={{ mt: '10px' }}>
      <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
        {<PageNavigationList setPage={handleSectionChange} />}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8, md: 10 }}>{renderContent()}</Grid2>
    </Grid2>
  );
};

export default Home;
