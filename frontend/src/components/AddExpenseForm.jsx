import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewExpense, getGroupList } from '../../utils/api.calls';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  desc: Yup.string().required('Description is required'),
  amount: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .min(1, 'Amount must be at least 1')
    .required('Amount is required'),
  g_id: Yup.string().required('Group is required'),
});
function AddExpenseForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupname, setGroupname] = useState('');
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  const [altert, setAltert] = useState(null);
  const mutation = useMutation({
    mutationFn: async (newExpense) => {
      const res = await createNewExpense(newExpense);
      return res.data;
    },
    onSuccess: () => {
      handleAlert({
        message: 'expense added successfully',
        severity: 'success',
      });
      queryClient.invalidateQueries('userExpenses');
      setTimeout(() => {
        handleClose();
      }, 700);
    },
    onError: (err) => {
      handleAlert({
        message: err.message || 'An error occurred while adding the expense.',
        severity: 'error',
      });
    },
  });
  const { data: groupList, error: gListError } = useQuery({
    queryKey: ['groupList'],
    queryFn: async () => {
      const res = await getGroupList();
      return res.data;
    },
  });
  function handleAlert(obj) {
    setAltert(obj);
    setTimeout(() => {
      setAltert(null);
    }, 2000);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { title, desc: description, amount, g_id: groupname };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      console.log(values);
      mutation.mutate(values);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      console.log(validationErrors);

      setErrors(validationErrors);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        color="primary"
        onClick={handleClickOpen}
        sx={{ fontWeight: 'normal' }}
      >
        Add Expense
      </Button>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          handleClose();
        }}
      >
        {altert && <Alert severity={altert.severity}>{altert.message}</Alert>}
        <DialogTitle
          sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '400' }}
        >
          Add Expense
        </DialogTitle>
        {mutation.isPending ? (
          <Box
            sx={{
              width: '400px',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            <Typography variant="body1" color="initial" display={'block'}>
              submitting....
            </Typography>
          </Box>
        ) : (
          <DialogContent sx={{ maxWidth: '400px' }}>
            {gListError && <Alert>{gListError.message}</Alert>}
            <form id="expenseForm" onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                margin="dense"
                label="Description"
                type=" text"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.desc}
                helperText={errors.desc}
              />
              <TextField
                label="Amount"
                margin="dense"
                value={amount}
                fullWidth
                slotProps={{
                  input: {
                    min: 1,
                  },
                }}
                variant="outlined"
                type="number"
                onChange={handleAmountChange}
                error={!!errors.amount}
                helperText={errors.amount}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupname}
                  label="group"
                  error={!!errors.groupname}
                  onChange={(e) => {
                    setGroupname(e.target.value);
                  }}
                >
                  {groupList?.map((group) => (
                    <MenuItem key={group.g_id} value={group.g_id}>
                      {group.title}
                    </MenuItem>
                  ))}
                </Select>{' '}
                {errors.g_id && (
                  <Typography variant="caption" color="error">
                    {errors.g_id}
                  </Typography>
                )}
              </FormControl>
            </form>
          </DialogContent>
        )}
        <DialogActions sx={{ mb: '20px' }}>
          <Button
            variant="text"
            onClick={handleClose}
            color="secondary"
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="text"
            form="expenseForm"
            color="primary"
            disabled={mutation.isPending}
          >
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddExpenseForm;
