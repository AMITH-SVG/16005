/**
 * LoadingSpinner Component
 * Displays loading state with animated spinner
 */

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * LoadingSpinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading notifications...',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        gap: 2,
      }}
    >
      <CircularProgress size={60} sx={{ color: '#2196f3' }} />
      <Typography variant="body1" sx={{ color: '#666', textAlign: 'center' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
