import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from './AlterProvider';

const LeaveGroup = ({ handleClose, groupId }) => {
  const [open, setOpen] = useState(false);
  const [altert, setAlert] = React.useState(null);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['leaveGroup'],
    mutationFn: async () => {},
    onSuccess: () => {},
    onError: (err) => {
      setAlert(err.message);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    },
  });

  function handleSave() {}
  function handleLeaveOpen() {
    setOpen(true);
  }
  function handleLeveClose() {
    setOpen(false);
    handleClose();
  }
  //   if (error)
  //     return (
  //       <>
  //         <Alert>{error.message}</Alert>
  //       </>
  //     );
  return (
    <React.Fragment>
      <MenuItem onClick={handleLeaveOpen}>Leave group</MenuItem>
      <Dialog
        open={open}
        onClose={handleLeveClose}
        aria-labelledby="add memrbers"
        aria-describedby="add new members to group"
        PaperProps={{
          sx: { maxHeight: '400px' },
        }}
      >
        {altert && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Alert severity="error">{altert}</Alert>
          </Box>
        )}
        <DialogTitle id="add new member" sx={{ textAlign: 'center' }}>
          Please click on Confirm to leave group
        </DialogTitle>
        {
          <DialogActions
            sx={{ display: 'flex', justifyContent: 'center', mb: '10px' }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              disabled={mutation.isPending}
              sx={{ textTransform: 'capitalize', flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={mutation.isPending}
              sx={{ textTransform: 'capitalize', flex: 1 }}
              autoFocus
            >
              {mutation.isPending ? 'leaving...' : 'confirm'}
            </Button>
          </DialogActions>
        }
      </Dialog>
    </React.Fragment>
  );
};

export default LeaveGroup;
