import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useCallback } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddNewMemberToGroup from './AddNewMemberToGroup';
import LeaveGroup from './LeaveGroup';

const GroupDescriptionMenu = ({ groupId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ ml: 'auto' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <AddNewMemberToGroup handleClose={handleClose} groupId={groupId} />
        <LeaveGroup handleClose={handleClose} groupId={groupId} />
      </Menu>
    </Box>
  );
};

export default GroupDescriptionMenu;
