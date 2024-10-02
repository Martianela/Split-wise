import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
} from '@mui/material';
import React from 'react';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { getUserGroups } from '../../utils/api.calls';
import { useQuery } from '@tanstack/react-query';

const GroupList = ({ selectedGroup, setSelectedGroup }) => {
  const {
    isLoading,
    data: userGroups,
    error,
  } = useQuery({
    queryKey: ['userGroups'],
    queryFn: async () => {
      const { data } = await getUserGroups();
      return data;
    },
  });
  if (error) {
    console.log(error);

    return (
      <>
        <Alert>{error.message}</Alert>
      </>
    );
  }

  return (
    <nav>
      <Stack
        sx={{
          px: '3px',
          borderRight: '1px solid',
          overflowX: 'auto',
          height: 'calc(100vh - 110px)',
        }}
        spacing={'2px'}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: '6px' }}>
            <CircularProgress size="30px" />
          </Box>
        ) : (
          userGroups.map((group) => (
            <ListItem disablePadding key={group.g_id}>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                  borderRadius: '8px',
                  cursor: 'pointer',
                  bgcolor:
                    group.g_id == selectedGroup
                      ? 'rgba(0, 0, 0, 0.12)'
                      : 'inherit',
                }}
                onClick={() => setSelectedGroup(group.g_id)}
              >
                <ListItemIcon>
                  <Avatar>
                    <Groups2OutlinedIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  sx={{ textTransform: 'capitalize' }}
                  primary={group.title}
                  secondary={
                    group.desc.length > 40
                      ? group.desc.slice(0, 40) + '...'
                      : group.desc
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </Stack>
    </nav>
  );
};

export default GroupList;
