import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  List,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import exp from '../../exp';
import { format } from 'date-fns';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddExpenseForm from './AddExpenseForm';
import { useQuery } from '@tanstack/react-query';
import { getUserExpense } from '../../utils/api.calls';

const Expense = () => {
  const {
    isLoading,
    data: useExpense,
    error,
  } = useQuery({
    queryKey: ['userExpenses'],
    queryFn: async () => {
      const { data } = await getUserExpense();
      return data;
    },
  });

  if (error) {
    return (
      <Box>
        <Alert>{error.message}</Alert>
      </Box>
    );
  }

  function formateDate(newdate) {
    const date = new Date(newdate);
    return (
      <Typography variant="body1" color="primary">
        {format(date, 'dd')}
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: 'block' }}
        >
          {format(date, 'MMM')}
        </Typography>
      </Typography>
    );
  }
  return (
    <Paper sx={{ padding: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          mb: '30px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600',
            fontFamily: 'Montserrat',
          }}
        >
          Expenses
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: '6px' }}>
          <AddExpenseForm />
          <Button
            variant="text"
            color="text.primary"
            sx={{ fontWeight: 'normal' }}
          >
            Settel up
          </Button>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {isLoading ? (
            <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip
                  variant="filled"
                  color="info"
                  label="loading expenses ..."
                  size="small"
                />
              </Box>
            </React.Fragment>
          ) : (
            useExpense?.map((expense) => (
              <Box
                key={expense.expanse_id}
                sx={{
                  bgcolor:
                    !expense?.expenseTransactions?.length ||
                    expense?.expenseTransactions[0]?.status === 'done'
                      ? 'rgb(6, 208, 1,.2)'
                      : '#EEEEEE',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '6px',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', gap: '6px' }}>
                  {formateDate(expense.updatedAt)}
                  <Typography variant="body1" textTransform={'capitalize'}>
                    {expense.title}{' '}
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: 'block' }}
                    >
                      {expense.group.title}
                    </Typography>
                  </Typography>
                </Box>

                <Box sx={{ height: '45px' }}>
                  <Typography variant="caption" color="initial">
                    {expense.desc}
                  </Typography>
                </Box>
                <Box>
                  {expense.expenseTransactions &&
                  expense.expenseTransactions.length > 0 ? (
                    <>
                      <Typography variant="body2" color="secondary">
                        {expense.expenseTransactions[0].payer.username} has to
                        give rs {expense.expenseTransactions[0].amount} money to{' '}
                        {expense.expenseTransactions[0].receiver.username}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      setteled
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'center',
                      textAlign: 'right',
                    }}
                  >
                    <CurrencyRupeeIcon sx={{ fontSize: '20px' }} />
                    <Typography variant="subtitle1" color="textPrimary">
                      {expense.amount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Expense;
