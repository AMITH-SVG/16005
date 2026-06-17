/**
 * MainLayout Component
 * Provides the main app layout with AppBar and navigation
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logger } from '../middleware/logger';
import { getUnviewedNotificationsCount } from '../utils/localStorage';

interface MainLayoutProps {
  children: React.ReactNode;
  totalNotifications: number;
}

/**
 * MainLayout component
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children, totalNotifications }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const unviewedCount = getUnviewedNotificationsCount(totalNotifications);

  const currentTab = location.pathname === '/priority' ? 1 : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const path = newValue === 0 ? '/' : '/priority';
    logger.navigation(location.pathname, path);
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Badge badgeContent={unviewedCount} color="error" sx={{ mr: 2 }}>
            <NotificationsIcon sx={{ fontSize: 28 }} />
          </Badge>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Campus Notification System
          </Typography>
        </Toolbar>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Tab
              label="All Notifications"
              sx={{
                color: currentTab === 0 ? 'white' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: currentTab === 0 ? 'bold' : 'normal',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
            <Tab
              label="Priority Notifications"
              sx={{
                color: currentTab === 1 ? 'white' : 'rgba(255, 255, 255, 0.7)',
                fontWeight: currentTab === 1 ? 'bold' : 'normal',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          </Tabs>
        </Box>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          py: 2,
          mt: 4,
          borderTop: '1px solid #ddd',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
            Campus Notification System © 2024 - All rights reserved
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            {totalNotifications} total notifications | {unviewedCount} unviewed
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
