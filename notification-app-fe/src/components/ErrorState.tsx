/**
 * ErrorState Component
 * Displays error message with retry button
 */

import React from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

/**
 * ErrorState component
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        gap: 3,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <ErrorIcon sx={{ fontSize: 60, color: '#d32f2f' }} />
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#333' }}>
          Something went wrong
        </Typography>
      </Box>

      <Alert severity="error" sx={{ maxWidth: '500px', textAlign: 'left' }}>
        {message}
      </Alert>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 24px',
        }}
      >
        Try Again
      </Button>

      <Typography variant="caption" sx={{ color: '#999', textAlign: 'center', mt: 2 }}>
        If the problem persists, please try refreshing the page or contact support.
      </Typography>
    </Box>
  );
};

export default ErrorState;
