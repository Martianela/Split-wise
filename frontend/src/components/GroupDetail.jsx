import React from 'react';
import Typography from '@mui/material/Typography';
import mockGroups from '../../Gplist';
import {
  Alert,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonIcon from '@mui/icons-material/Person';
import groupImage from '../assets/images/groupImage.jpg';
import { format } from 'date-fns';
import GroupDescriptionMenu from './groupDescriptionMenu';
import { useQuery } from '@tanstack/react-query';
import { getGroupDetail } from '../../utils/api.calls';

const GroupDetail = ({ groupId }) => {
  const {
    isLoading,
    data: groupDetail,
    error,
  } = useQuery({
    queryKey: ['groupDetail', groupId],
    queryFn: async () => {
      const res = await getGroupDetail(groupId);
      return res.data;
    },
    enabled: !!groupId,
  });
  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert>getting details..</Alert>
      </Box>
    );
  if (error)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity="error">Error loading group details</Alert>
      </Box>
    );
  function customDate(date) {
    return format(new Date(date), 'dd/MM/yyyy');
  }

  return (
    <Box>
      <Box
        sx={{ padding: '6px', display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Avatar>
          <Groups2OutlinedIcon />
        </Avatar>
        <Typography
          variant="body1"
          sx={{ fontWeight: '500', textTransform: 'capitalize' }}
          color="initial"
        >
          {groupDetail.title}
        </Typography>
      </Box>

      <Divider />
      <Box
        sx={{
          maxHeight: 'calc(100vh - 110px)',
          overflow: 'auto',
        }}
      >
        <Box sx={{ padding: '20px' }}>
          <GroupDescriptionMenu groupId={groupDetail.g_id} />
          <Avatar
            alt="group img"
            src={groupImage}
            sx={{
              width: 110,
              height: 110,
              ml: 'auto',
              mr: 'auto',
              mt: '40px',
              mb: '20px',
            }}
          />
          <Typography
            variant="h5"
            color="initial"
            textAlign={'center'}
            sx={{ textTransform: 'capitalize' }}
          >
            {groupDetail.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ mt: '20px', width: '100%' }}
            textAlign={'center'}
          >
            Created at -: {customDate(groupDetail.createdAt)}
          </Typography>{' '}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: '20px', width: '100%' }}
            textAlign={'center'}
          >
            Created at -: {groupDetail.createdBy}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: '8px' }}>
          <Typography variant="body1" color="initial">
            Members
          </Typography>
          <List>
            {groupDetail.members.map((member) => (
              <ListItem disablePadding sx={{ mb: '6px' }} key={member.id}>
                <ListItemIcon>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  sx={{ textTransform: 'capitalize' }}
                  primary={member.username}
                  secondary={member.bio}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetail;
