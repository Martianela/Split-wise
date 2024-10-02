import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Divider, Fab, IconButton, Paper } from '@mui/material';
import { Grid2 as Grid } from '@mui/material';
import CreateNewGroupForm from './createNewGroupForm';
import GroupList from './GroupList';
import GroupDetail from './GroupDetail';
import NoGroupSelected from './NoGroupSelected';
const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  return (
    <React.Fragment>
      <Paper>
        <Grid container spacing={1}>
          <Grid size={5}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '500',
                }}
              >
                Groups
              </Typography>
              <CreateNewGroupForm />
            </Box>
            <Divider />
            <GroupList
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </Grid>
          <Grid size={7}>
            {selectedGroup !== null ? (
              <GroupDetail groupId={selectedGroup} />
            ) : (
              <NoGroupSelected />
            )}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Groups;
