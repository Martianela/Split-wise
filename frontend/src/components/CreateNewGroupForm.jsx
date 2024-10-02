import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  OutlinedInput,
  Chip,
  Box,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewGroup, getUserList } from '../../utils/api.calls';

const CreateNewGroupForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [members, setMembers] = useState([]);
  const [altert, setAltert] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['create-new-group'],
    mutationFn: async (newExpense) => {
      const res = await createNewGroup(newExpense);
      return res.data;
    },
    onSuccess: () => {
      handleAlert({
        message: 'group created successfully',
        severity: 'success',
      });
      queryClient.invalidateQueries('userGroups');
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
  const { data: userList, error: userListError } = useQuery({
    queryKey: ['userList'],
    queryFn: async () => {
      const res = await getUserList();
      return res.data;
    },
    enabled: open,
  });
  function handleAlert(obj) {
    setAltert(obj);
    setTimeout(() => {
      setAltert(null);
    }, 2000);
  }
  if (userListError) {
    handleAlert({ message: 'unable to get members list', severity: 'error' });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMemberSelection = (event) => {
    const {
      target: { value },
    } = event;
    setMembers(typeof value === 'string' ? value.split(',') : value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newGroupObj = { title, desc, members };
    mutation.mutate(newGroupObj);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="new group"
        onClick={handleClickOpen}
        color="primary"
        sx={{ ml: 'auto' }}
      >
        <GroupAddIcon fontSize="medium" />
      </IconButton>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          handleClose();
        }}
      >
        <DialogTitle
          sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '400' }}
        >
          Create new Group
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
            <Typography
              variant="body1"
              color="initial"
              sx={{ display: 'block' }}
            >
              creating...
            </Typography>
          </Box>
        ) : (
          <DialogContent sx={{ maxWidth: '400px' }}>
            {altert && (
              <Alert severity={altert.severity}>{altert.message}</Alert>
            )}
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
                required
              />
              <TextField
                margin="dense"
                label="Description"
                type=" text"
                fullWidth
                variant="outlined"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />

              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">
                  Add Members
                </InputLabel>
                <Select
                  id="select members"
                  value={members}
                  label="Add Members"
                  multiple
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Add Members"
                    />
                  }
                  onChange={handleMemberSelection}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {userList?.map((user) => (
                    <MenuItem key={user.id} value={user.username}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
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
            create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateNewGroupForm;
