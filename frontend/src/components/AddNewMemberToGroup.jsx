import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewMembrsToGroup, getNonGroupMembers } from '../../utils/api.calls';
import { useAlert } from './AlterProvider';

const AddNewMemberToGroup = ({ handleClose, groupId }) => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [altert, setAlert] = React.useState(null);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  function handleAddMemberOpen() {
    setOpen(true);
  }
  function handleaddMemberClose() {
    setOpen(false);
    handleClose();
  }
  const mutation = useMutation({
    mutationKey: ['addingNewMember'],
    mutationFn: async (newMembers) => {
      const res = await addNewMembrsToGroup(groupId, newMembers);
      return res.success;
    },
    onSuccess: () => {
      handleaddMemberClose();
      showAlert('members successfully added', 'success');
      queryClient.invalidateQueries(['groupDetail', groupId]);
    },
    onError: (err) => {
      setAlert(err.message);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    },
  });
  const {
    isLoading,
    data: nonGroupMembers,
    error,
    refetch,
  } = useQuery({
    queryKey: ['nonGroupMembers', groupId],
    queryFn: async () => {
      const { data } = await getNonGroupMembers(groupId);
      return data;
    },
    enabled: open,
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  function handleSave() {
    if (checked.length === 0) {
      showAlert('Please select at least open file', 'info');
      return;
    }
    const value = { members: checked };

    mutation.mutate(value);
  }
  if (error)
    return (
      <>
        <Alert>{error.message}</Alert>
      </>
    );
  return (
    <React.Fragment>
      <MenuItem onClick={handleAddMemberOpen}>Add members</MenuItem>
      <Dialog
        open={open}
        onClose={handleaddMemberClose}
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
            <Alert severity="error">{error.message}</Alert>
          </Box>
        )}
        <DialogTitle id="add new member" sx={{ textAlign: 'center' }}>
          Add new members to group
        </DialogTitle>
        {nonGroupMembers?.length === 0 ? (
          <DialogContent>
            <Typography variant="body1" color="initial">
              every one is already is present in group
            </Typography>
          </DialogContent>
        ) : (
          <React.Fragment>
            <DialogContent>
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <List>
                  {nonGroupMembers?.map((member) => (
                    <ListItem
                      key={member.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(member.username)}
                          checked={checked.includes(member.username)}
                          inputProps={{
                            'aria-labelledby': 'list_member' + member.id,
                          }}
                        />
                      }
                      disablePadding
                      sx={{ mb: '6px' }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={`groupmember ${member.username}`} />
                      </ListItemAvatar>
                      <ListItemText primary={member.username} />
                    </ListItem>
                  ))}
                </List>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleaddMemberClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={mutation.isPending}
                autoFocus
              >
                {mutation.isPending ? 'adding...' : 'add'}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default AddNewMemberToGroup;
