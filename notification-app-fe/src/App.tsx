/**
 * App Component
 * Main app router and layout
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import AllNotifications from './pages/AllNotifications';
import PriorityNotifications from './pages/PriorityNotifications';
import { logger } from './middleware/logger';
import { notificationService } from './api/notificationService';

/**
 * Create Material-UI theme
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

/**
 * App component
 */
function App(): JSX.Element {
  const [totalNotifications, setTotalNotifications] = useState(0);

  /**
   * Fetch total notification count on app load
   */
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const notifications = await notificationService.fetchAllNotifications();
        setTotalNotifications(notifications.length);
        logger.debug('App initialized', { totalNotifications: notifications.length });
      } catch (error) {
        logger.error('Failed to fetch total notification count', error);
      }
    };

    fetchTotalCount();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout totalNotifications={totalNotifications}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
