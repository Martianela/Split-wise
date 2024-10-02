import { useTheme } from '@emotion/react';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import React from 'react';

const pages = ['Home', 'my-transaction', 'groups'];
export default function PageNavigationList({ setPage }) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(pages[newValue].toLowerCase());
  };

  return (
    <Box>
      <Tabs
        value={value}
        orientation={!isLargeScreen ? 'horizontal' : 'vertical'}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="pages"
      >
        {pages.map((page, index) => (
          <Tab
            key={index}
            label={page}
            sx={{
              width: { xs: 'auto', sm: '100%' },
              ':hover': { bgcolor: '#D1E9F6' },
              textAlign: 'left',
              px: 0,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
