import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Fab,
  Paper,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import TransactionTable from './TransactionTable';
import { getUserTransaction } from '../../utils/api.calls';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Tranactions = () => {
  const queryClient = useQueryClient();
  const [isManualLoading, setManualLoading] = useState(false);
  const {
    isLoading,
    data: userTransactions,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userTransaction'],
    queryFn: async () => {
      const { data } = await getUserTransaction();
      return data;
    },
  });
  const handleRefresh = async () => {
    setManualLoading(true);
    await queryClient.invalidateQueries(['userTransaction']);
    setManualLoading(false);
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert>getting details..</Alert>
      </Box>
    );
  return (
    <Paper sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600',
            fontFamily: 'Montserrat',
          }}
        >
          My Transaction
        </Typography>
        <Fab
          variant="circular"
          size="medium"
          color="primary"
          sx={{ ml: 'auto' }}
          onClick={handleRefresh}
          disabled={isManualLoading}
        >
          {isManualLoading ? (
            <CircularProgress size={24} />
          ) : (
            <RefreshOutlinedIcon fontSize="medium" />
          )}
        </Fab>
      </Box>
      {isManualLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert>refreshing...</Alert>
        </Box>
      ) : (
        <TransactionTable transactions={userTransactions} />
      )}
    </Paper>
  );
};

export default Tranactions;
