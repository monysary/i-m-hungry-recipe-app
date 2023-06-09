import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar() {
  return (
    <Box sx={{ width: '100%', marginBottom: "2rem" }}>
      <LinearProgress />
    </Box>
  );
}